'use strict';
var inquirer = require('inquirer');
var shell = require('shelljs');

let indexFlag;

process.argv.forEach(function (val, index, array) {
  if (val == '--create' || val == '--rename' ) {
    indexFlag = index;
  }
});

inquirer.prompt([
  {
    type: 'list',
    name: 'branchType',
    message: 'Branch Type?',
    choices: [
      {
        key: 'feature',
        name: 'feature',
        value: 'feature'
      },
      {
        key: 'fix',
        name: 'fix',
        value: 'fix'
      },
      {
        key: 'enhancement',
        name: 'enhancement',
        value: 'enhancement'
      },
      {
        key: 'doc',
        name: 'doc',
        value: 'doc'
      },
      {
        key: 'refactor',
        name: 'refactor',
        value: 'refactor'
      },
      {
        key: 'style',
        name: 'style',
        value: 'style'
      },
      {
        key: 'test',
        name: 'test',
        value: 'test'
      },
      {
        key: 'task',
        name: 'task',
        value: 'task'
      },
      {
        key: 'chore',
        name: 'chore',
        value: 'chore'
      },
      {
        key: 'feature',
        name: 'feature',
        value: 'feature'
      },
      {
        key: 'bugfix',
        name: 'bugfix',
        value: 'bugfix'
      }
    ],
    validate: function (answer) {
      if (answer.length < 1) {
        return 'Debe elegir al menos una opcion.';
      }
      return true;
    }
  },
  {
    type: 'list',
    name: 'project',
    message: 'Project?',
    choices: [
      {
        key: 'EO',
        name: 'EO',
        value: 'eo'
      },
      {
        key: 'V5X',
        name: 'V5X',
        value: 'v5x'
      }
    ],
    validate: function (answer) {
      if (answer.length < 1) {
        return 'Debe elegir al menos una opcion.';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'issueNumber',
    message: 'Issue Number?',
    validate: function (answer) {
      var regex =  /^[0-9]*$/;
      if (answer.length < 1) {
        return 'Debe completar el campo con un numero.';
      }
      if (answer.match(regex)) {
        return true;
      }
      
      return 'Debe ser un numero.';
      
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description?',
    validate: function (answer) {
      if (answer.length < 1) {
        return 'Debe completar el campo con un numero.';
      }

      return true;
    },
    filter: function (answer) {
      return answer.replace(/["'\s]/gi, '');
    }
  }
]).then(function (answers) {

  let bootstrapBranch; 

  if (process.argv[indexFlag] == '--create') {
    bootstrapBranch = 'git checkout develop && git pull origin develop && git checkout -b ';
  }

  if (process.argv[indexFlag] == '--rename') {
    bootstrapBranch = 'git branch -m ';
  }

  let createBranch = answers.branchType + '/' + answers.project + '-' + answers.issueNumber + '-' + answers.description ;

  shell.exec(bootstrapBranch + createBranch, {silent:true}).stdout
});
