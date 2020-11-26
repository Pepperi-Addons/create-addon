const inquirer = require('inquirer');

module.exports = {
    askPepperiCredentials: () => {
        const questions = [{
                name: 'username',
                type: 'input',
                message: 'Enter your Pepperi e-mail address:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your e-mail address.';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your password.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },

    askTemplates: () => {
        const questions = [
            {
                name: 'useServer',
                type: 'confirm',
                message: 'Would you like to use server-side?',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'No framework was chosen.';
                    }
                }
            },
            {
                name: 'serverLanguage',
                type: 'list',
                choices: ['typescript'],
                message: 'What language would you like to use for server-side? :',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'No framework was chosen.';
                    }
                },
                when: (answers => answers.useServer) 

            },
            {
                name: 'useClient',
                type: 'confirm',
                message: 'Does your addon need UI?'
               
            },
            {
                name: 'clientFramework',
                type: 'list',
                choices: ['angular', 'vanilla'],
                message: 'What framework would you like to use? :',
                when: (answers => answers.useClient),
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'No framework was chosen.';
                    }
                }
            },
            {
                name: 'frameworkVersion',
                type: 'list',
                choices: ['10'],
                message: 'Which Angular version? :',
                when: (answers => answers.useClient),
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'No version was chosen.';
                    }
                },
                when: (answers => answers.clientFramework === 'angular')
            }
        ];
        return inquirer.prompt(questions);
    },

    askForAddonMetadata: () => {
        const questions = [{
                name: 'addonname',
                type: 'input',
                message: 'Please write your addon`s name:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Addon`s name cannot be empty.';
                    }
                }
            },
            {
                name: 'addondescription',
                type: 'input',
                message: 'Please write your addon`s description:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Addon`s description cannot be empty.';
                    }
                }
            },
            // {
            //     name: 'addontype',
            //     type: 'list',
            //     choices: ['Sytem', 'Public', 'Dev', 'Distributor'],
            //     message: 'Please choose your addon type:',
            //     validate: function(value) {
            //         if (value.length) {
            //             return true;
            //         } else {
            //             return 'No type was chosen.';
            //         }
            //     }
            // },
            // {
            //     name: 'addonuuid',
            //     type: 'input',
            //     message: 'Write your addon`s UUID(optional):',
            //     validate: function(value) {
            //         return true;

            //     }
            // },
            // {
            //     name: 'usengxlib',
            //     type: 'confirm',
            //     message: 'Would you like to use our components library (@pepperi-addons/ngx-lib) ?',
            //     validate: function(value) {
            //         return true;

            //     }
            // }
        ];
        return inquirer.prompt(questions);
    }


};