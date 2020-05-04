#!/usr/bin/env node

const fs = require('fs-extra');
const https = require('follow-redirects').https;
const AdmZip = require('adm-zip');


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
    return new Promise((resolve, reject) => {
        const exec = require('child_process').exec;
        const cmd = exec('npm install');
        cmd.on('exit', () => {
            resolve()
        });
    });
} 



async function main() {
    const template = process.argv[1] || 'typescript';
    const path = '.';
    const tmpPath = path + '/tmp';
    const zipFile = tmpPath + '/repo.zip';

    try {
        console.log("template = ", template);

        if (fs.existsSync(tmpPath)) {
            fs.rmdirSync(tmpPath, { recursive: true});
        }
    
        fs.mkdirSync(tmpPath, { recursive: true});
    
        console.log('downloading files from github...');
        await downloadRepo('https://github.com/Pepperi-Addons/HelloWorld-Backend/archive/master.zip', zipFile);
        
        console.log('extracting zip file');
        await extract(zipFile, tmpPath);

        const templatePath = tmpPath + '/HelloWorld-Backend-master/templates/' + template;
        if (!fs.exists(templatePath)) {
            throw new Error(`Template ${template} doesn't exists`);
        }
        
        console.log('copying neccesary files');
        await copy(tmpPath + '/HelloWorld-Backend-master/templates/' + template, path);
        
        console.log("installing dependancies..");
        await install();
        
        console.log('you are now good to go');
    }
    catch (err) {
        console.err(err);
    }
    finally {
        console.log("removing temporary files");
        fs.rmdirSync(tmpPath, { recursive: true });
    }
    
}


main();