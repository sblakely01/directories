#!/usr/bin/env node
const readline = require('readline');
const tree = require('../helpers/treehelper.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let multipleLines = '';
let treeArray = [];

function createTree(line) {

}

function listTrees() {

}

function moveTree(line) {

}

function deleteTree(line) {
    
}

rl.question('Enter your directory commands followed by the word end: ', () => {
    rl.on('line', (line) => {
        if (line === 'end') {
            rl.close();
            processInput(multipleLines);
        } else {
            multipleLines += line + '\n';
        }
    });
})

function processInput(input) {
    console.log('You entered:\n', input);
}