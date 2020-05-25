#!/usr/bin/env node

const fs = require('fs-extra');
const rimraf = require('rimraf');
const https = require('follow-redirects').https;
const AdmZip = require('adm-zip');
const { spawn } = require('child_process');
const tmp = require('tmp');
const path = require('path');
const cwd = process.cwd();


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
            }
            else {
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



async function main() {
    const template = process.argv[2] || 'typescript';
    const tmpDirObj = tmp.dirSync({
        unsafeCleanup: true
    });
    const tmpPath = tmpDirObj.name;
    const zipFile = path.join(tmpPath, 'repo.zip');

    try {
        console.log("template = ", template);
    
        console.log('downloading files from github...');
        await downloadRepo('https://github.com/Pepperi-Addons/create-addon/archive/master.zip', zipFile);
        
        console.log('extracting zip file');
        await extract(zipFile, tmpPath);

        const templatePath = tmpPath + '/create-addon-master/templates/' + template;
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template ${template} doesn't exists`);
        }
        
        console.log('copying neccesary files');
        await copy(templatePath, path);
        
        console.log("installing dependancies..");
        await install();
        
        console.log('you are now good to go');
    }
    catch (err) {
        console.error(err);
    }
    finally {
        console.log("removing temporary files");
        tmpDirObj.removeCallback();
    }
    
}


main();