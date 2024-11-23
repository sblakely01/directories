#!/usr/bin/env node
const readline = require('readline');
const { TreeNode } = require('../helpers/treehelper.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let multipleLines = [];
let commandText = '';
let treeArray = [];

function processCommands(lines) {
    let result = "";
    console.log(lines);

    for (let i = 0; i < lines.length; i++) {
        let processedArray = lines[i].split(' ');
        console.log(processedArray);
        if (processedArray[0] === "CREATE") {
            createTree(processedArray[1]);
            result += lines[i] + '\n';
        } else if (processedArray[0] === "LIST") {
            result += line + " is a list command";
        } else if (processedArray[0] === "MOVE") {
            result += line + " is a move command";
        } else if (processedArray[0] === "DELETE") {
            result += line + " is a delete command";
        } else {
            continue;
        }
    }
    console.log("Your results: " + result);
}

function findPath(path, tree) {
    let filteredPath = path.filter(function(e) {return e != path[0]}); //apples, fuji
    if (filteredPath.length === 1) {
        tree.addChild(filteredPath[0]);
    }
    for (var i = 0; i < tree.children.length; i++) {
        if (tree.children[i].value === filteredPath[0]) {
            findPath(filteredPath, tree.children[i]);
        }
    }
    return;
}

function createTree(line) {
    console.log(JSON.stringify(treeArray));
    let path = line.split('/');
    //handle exception for if Create is run twice on a single object (already in treeArray)
    if (path.length === 1) {
        const newTree = new TreeNode(path[0]);
        treeArray.push(newTree);
    } else {
        for (var i = 0; i < treeArray.length; i++) {
            if (treeArray[i].value === path[0]) {
                console.log("Found match in array on " + treeArray[i].value);
                //treeArray[i].addChild(path[1]);
                findPath(path, treeArray[i]);
            }
        }
    }
    return;
}

function listTrees(item, index, arr) {

}

function moveTree(line) {

}

function deleteTree(line) {

}

rl.question('Enter your directory commands followed by the word end: ', (first) => {
    commandText += first + '\n';
    rl.on('line', (line) => {
        if (line === 'end') {
            rl.close();
            multipleLines = commandText.split('\n');
            processCommands(multipleLines);
        } else {
            commandText += line + '\n';
        }
    });
});