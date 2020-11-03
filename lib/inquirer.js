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
        const questions = [{
                name: 'serverLanguage',
                type: 'list',
                choices: ['typescript', 'javascript'],
                message: 'What language would you like to use for server-side? :',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'No framework was chosen.';
                    }
                }
            },
            {
                name: 'clientFramework',
                type: 'list',
                choices: ['angular', 'react', 'vue', 'vanilla'],
                message: 'What framework would you like to use? :',
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
                choices: ['10', '7'],
                message: 'Which Angular version? :',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'No version was chosen.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }

};