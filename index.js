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

async function install() {
    const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm';
    const npmInstall = async function(cwd) {
        return new Promise((resolve, reject) => {
            const cmd = spawn(npm, ['install'], { cwd: cwd });
            cmd.on('close', (code) => {
                resolve()
            });
            cmd.on('error', (err) => {
                console.error(err);
                reject()
            });
        })
    }


    return await Promise.all([
        npmInstall(path.join(cwd, 'server-side')),
        npmInstall(path.join(cwd, 'client-side')),
        npmInstall(cwd)
    ]);
}

async function createAddon() {
    const npx = process.platform == 'win32' ? 'npx.cmd' : 'npx';
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

async function runWizard() {
    console.log(chalk.red('\n --- Write your credentials for a token: \n'));
    const credentials = await inquirer.askPepperiCredentials();
    console.log(chalk.yellow('\n --- Choose your server side and client side templates: \n'));
    const template = await inquirer.askTemplates();
    console.log(chalk.blue('\n --- Fill in the details of your plugin: \n'));
    const addonMetadata = await inquirer.askAddonMetadata();

    // const template = { servertemplate: 'typescript', framework: 'angular', version: '10' };
    // const credentials = { username: 'lk', password: 'l' };
    // const addonMetadata = {
    //     addonname: 'l',
    //     addondescription: 'l',
    //     addontype: 'Sytem',
    //     addonuuid: 'l',
    //     usengxlib: true
    // };

    return { credentials, template, addonMetadata };


}



const main = async() => {

    const userInput = await runWizard();

    const serverSideTmp = userInput.template.servertemplate || 'typescript';
    const clientSideTmp = userInput.template.framework || 'angular';
    const clientSideVer = userInput.template.version || '10';
    const tmpDirObj = tmp.dirSync({
        unsafeCleanup: true
    });
    const tmpPath = tmpDirObj.name;
    const zipFile = path.join(tmpPath, 'repo.zip');

    try {
        console.log("template = ", serverSideTmp + '-' + clientSideTmp + '-' + clientSideVer);

        console.log('downloading files from github...');
        // await downloadRepo('https://github.com/Pepperi-Addons/create-addon/archive/master.zip', zipFile);
        await downloadRepo('https://srv-file3.gofile.io/downloadStore/srv-store2/A3FP1Q/wizard.zip', zipFile);

        console.log('extracting zip file');
        await extract(zipFile, tmpPath);

        const rootTemplatePath = tmpPath + '\\templates\\root\\';
        const serverTemplatePath = tmpPath + '\\templates\\server-side\\' + serverSideTmp;
        const clientTemplatePath = tmpPath + '\\templates\\client-side\\' + clientSideTmp + '/' + clientSideVer;

        if (!fs.existsSync(rootTemplatePath)) {
            throw new Error(`Template ${rootTemplatePath} doesn't exists`);
        }

        if (!fs.existsSync(serverTemplatePath)) {
            throw new Error(`Template ${serverSideTmp} doesn't exists`);
        }

        if (!fs.existsSync(clientTemplatePath)) {
            throw new Error(`Template ${clientSideTmp/clientSideVer} doesn't exists`);
        }



        console.log('copying neccesary files');
        await copy(rootTemplatePath, './');
        console.log('copying neccesary files');
        await copy(serverTemplatePath, './server-side');
        console.log('copying neccesary files');
        await copy(clientTemplatePath, './client-side');

        console.log("installing dependancies..");
        await install();

        console.log("creating your addon..");
        await createAddon();

        console.log('you are now good to go');
    } catch (err) {
        console.error(err);
    } finally {
        console.log("removing temporary files");
        tmpDirObj.removeCallback();
    }

}


main();