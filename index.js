#!/usr/bin/env node

const fs = require('fs-extra');
const rimraf = require('rimraf');
const https = require('follow-redirects').https;
const AdmZip = require('adm-zip');
const { spawn } = require('child_process');
const tmp = require('tmp');
const path = require('path');
const cwd = process.cwd();
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const Spinner = require('cli-spinner').Spinner;
 
clear();

console.log(
    chalk.green(
        figlet.textSync('@Pepperi-Addons', { horizontalLayout: 'full' })
    )
);

// if (files.directoryExists('.git')) {
//     console.log(chalk.red('Already a Git repository!'));
//     process.exit();
// }


async function downloadRepo(url, path) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path);
        https.get(url, res => {
            res.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve();
            });
        })
    })
}

async function extract(src, dest) {
    return new Promise((resolve, reject) => {
        const zip = new AdmZip(src);
        zip.extractAllTo(dest, true);
        resolve();
    })
}

async function copy(src, dest) {
    return new Promise((resolve, reject) => {
        fs.copy(src, dest, function(err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function install(useServer = true, useClient = true, useCpi = false) {
    const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm';
    const yarn = process.platform == 'win32' ? 'yarn.cmd' : 'yarn';
    const depsInstall = async function(cwd, type) {
        return new Promise((resolve, reject) => {
            const cmd = spawn(type, ['install'], { cwd: cwd });
            cmd.on('close', (code) => {
                resolve()
            });
            cmd.on('error', (err) => {
                console.error(err);
                reject()
            });
        })
    }

    const promises = [depsInstall(cwd, npm)];
    if (useServer) { 
        promises.push(depsInstall(path.join(cwd, 'server-side'), npm));
    }
    if (useClient) { 
        promises.push(depsInstall(path.join(cwd, 'client-side'), npm));
    }    
    if (useCpi) { 
        promises.push(depsInstall(path.join(cwd, 'cpi-side'), npm));
    }
    return await Promise.all(promises);
}

async function createAddon(metadata) {

    const npx = /^win/.test(process.platform) ? 'npx.cmd' : 'npx';
    return new Promise((resolve, reject) => {
        const cmd = spawn(npx, ['create-addon'], { cwd: cwd });
        cmd.on('close', (code) => {
            resolve()
        });
        cmd.on('error', (err) => {
            console.error(err);
            reject()
        });
    })
}

async function chooseTemplate() {
    // console.log(chalk.red('\n --- Write your credentials for a token: \n'));
    // const credentials = await inquirer.askPepperiCredentials();

    console.log(chalk.yellow('\n --- Choose your templates: \n'));
    const template = await inquirer.askTemplates();
    return { template };


}

async function chooseAddonMetadata() {
    console.log(chalk.yellow('\n --- Fill in your addon\'s details: \n'));
    const metadata = await inquirer.askForAddonMetadata();
    return { metadata };
}

async function updateConfig(useServer = true, useClient = true, useCpi = false, clientVersion = '10') {
    await updatePackageJsonFile(useClient, useCpi, useServer, clientVersion);
    await updateAddonConfigFile(useCpi, useClient);
}

async function updatePackageJsonFile(useClient, useCpi, useServer, clientVersion) {
    const configPath = './package.json';
    if (fs.pathExists(configPath)) {
        try {
            const config = await fs.readJSON(configPath);

            let buildCommand = useClient ? 'cd ./client-side && npm run build && cd .. ' : '';
            buildCommand += useCpi ? '&& cd ./cpi-side && npm run build && cd .. ' : '';
            buildCommand += useServer ? '&& cd ./server-side && npm run build && cd ..' : '';

            const clientManager = clientVersion === '11' ? 'yarn' : 'npm install --force';

            let initCommand = useClient ? `cd ./client-side && ${clientManager} && cd .. ` : '';
            initCommand += useCpi ? '&& cd ./cpi-side && npm install --force && cd .. ' : '';
            initCommand += useServer ? '&& cd ./server-side && npm install --force && cd ..' : '';

            config.scripts.build = buildCommand.startsWith('&&') ? buildCommand.slice(2, buildCommand.length) : buildCommand;
            config.scripts.init = initCommand.startsWith('&&') ? initCommand.slice(2, initCommand.length) : initCommand;
            await fs.writeFile(configPath, JSON.stringify(config, null, "\t"));
        }
        catch (err) {
            console.error('could not read package.json file');
        }
    }
}

async function updateAddonConfigFile(useCpi, useClient) {
    const addonConfigPath = './addon.config.json';
    if (fs.pathExists(addonConfigPath)) {
        try {
            const config = await fs.readJSON(addonConfigPath);

            if (!useCpi) {
                config.PublishConfig.CPISide = [];
            }

            if (!useClient) {
                config.PublishConfig.Editors = [];
            }

            await fs.writeFile(addonConfigPath, JSON.stringify(config, null, "\t"));
        }
        catch (err) {
            console.error('could not read addon.config.json file');
        }
    }
}

const main = async() => {

   
    const tmpDirObj = tmp.dirSync({
        unsafeCleanup: true
    });
    const tmpPath = tmpDirObj.name;
    const zipFile = path.join(tmpPath, 'repo.zip');

    try {
        const userInput = await chooseTemplate();

        const serverSideTmp = userInput.template.serverLanguage || 'typescript';
        const clientSideTmp = userInput.template.clientFramework || 'angular';
        const clientSideVer = userInput.template.clientProjectType || null;
        console.log("template = ", serverSideTmp + ', ' + clientSideTmp + ' ' + clientSideVer ? clientSideVer : '');
        console.log('downloading files from github...');
        await downloadRepo('https://github.com/Pepperi-Addons/create-addon/archive/master.zip', zipFile);
        
        console.log('extracting zip file');
        await extract(zipFile, tmpPath);

        
        const rootTemplatePath = tmpPath + '/create-addon-master/templates/root';
        if (!fs.existsSync(rootTemplatePath)) {
            throw new Error(`Template ${rootTemplatePath} doesn't exists`);
        }
        console.log('copying root necessary files');
        await copy(rootTemplatePath, './');
        if (userInput.template.useServer) {
            const serverTemplatePath = tmpPath + '/create-addon-master/templates/server-side/' + serverSideTmp;
            if (!fs.existsSync(serverTemplatePath)) {
                throw new Error(`Template ${serverSideTmp} doesn't exists`);
            }
            console.log('copying server necessary files');
            await copy(serverTemplatePath, './server-side');
        }
        if (userInput.template.useClient) {
            const clientTemplatePath = tmpPath + '/create-addon-master/templates/client-side/' + clientSideTmp + (clientSideVer ? '/' + clientSideVer : '' );
            if (!fs.existsSync(clientTemplatePath)) {
                throw new Error(`Template ${clientTemplatePath} doesn't exists`);
            }
            console.log('copying client necessary files');
            await copy(clientTemplatePath, './client-side');
    
        }
        if (userInput.template.useCpi) {
            const cpiTemplatePath = tmpPath + '/create-addon-master/templates/cpi-side/';
            if (!fs.existsSync(cpiTemplatePath)) {
                throw new Error(`Template ${cpiTemplatePath} doesn't exists`);
            }
            console.log('copying client necessary files');
            await copy(cpiTemplatePath, './cpi-side');
    
        }

        console.log("updating package.json...");
        await updateConfig(userInput.template.useServer, userInput.template.useClient, userInput.template.useCpi, userInput.template.clientProjectType);

        console.log("installing dependencies...");
        const spinner = new Spinner('');
        spinner.setSpinnerString('|/-\\');
        spinner.start();
        await install(userInput.template.useServer, userInput.template.useClient, userInput.template.useCpi);

        console.log("creating your addon...");
        // const addon = await chooseAddonMetadata();
        // const res = await createAddon(addon.metadata);
        await createAddon();
        

        console.log('you are now good to go');
        spinner.stop();
    } catch (err) {
        console.error(err);
    } finally {
        console.log("removing temporary files");
        
        tmpDirObj.removeCallback();
    }    
}

main();
