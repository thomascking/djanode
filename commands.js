#!/usr/bin/env node
var program = require('commander');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;

program.version('0.1.0');

program.command('createproject [directory]').action((directory, command) => {
  if (directory) {
    console.log('Creating new project in', directory);
  }
  else {
    console.log('Creating new project in current directory.');
    directory = '.';
  }
  var sourceFolder = path.join(__dirname, 'template');
  var destinationFolder = path.join(process.cwd(), directory);
  fs.access(destinationFolder, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('creating new directory for project');
      fs.mkdir(destinationFolder, () => {
        ncp(sourceFolder, destinationFolder, (err) => console.log(err ? err : 'copied template'));
      });
    }
    else {
      ncp(sourceFolder, destinationFolder, (err) => console.log(err ? err : 'copied template'));
    }
  });
});

program.parse(process.argv);
