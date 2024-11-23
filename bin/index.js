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
let listStringBuilder = '';

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
            listTrees();
            result += "LIST" + '\n' + listStringBuilder + '\n'; 
        } else if (processedArray[0] === "MOVE") {
            result += line + " is a move command";
        } else if (processedArray[0] === "DELETE") {
            deleteTree(processedArray[1]);
            result += lines[i] + '\n';
        } else {
            continue;
        }
    }
    console.log("Your results: " + result);
}

function findPath(path, tree) {
    let filteredPath = path.filter(function(e) {return e != path[0]});
    if (filteredPath.length === 1) {
        return tree;
    }
    for (var i = 0; i < tree.children.length; i++) { // What if the path doesn't exist?
        if (tree.children[i].value === filteredPath[0]) {
            return findPath(filteredPath, tree.children[i]);
        }
    }
}

function createTree(line) {
    let path = line.split('/');
    //handle exception for if Create is run twice on a single object (already in treeArray)
    console.log(path);
    if (path.length === 1) {
        let newTree = new TreeNode(path[0]);
        treeArray.push(newTree);
    } else {
        for (var i = 0; i < treeArray.length; i++) {
            if (treeArray[i].value === path[0]) {
                console.log("Found match in array on " + treeArray[i].value);
                let targetNode = findPath(path, treeArray[i]);
                console.log(targetNode);
                targetNode.addChild(path[path.length - 1]);
            }
        }
    }
    return;
}

function traverseTree(tree, level) {
    for (let i = 0; i < tree.children.length; i++) {
        listStringBuilder += " ".repeat(level);
        listStringBuilder += tree.children[i].value + '\n';
        if (tree.children[i].children.length) {
            traverseTree(tree.children[i], level + 1);
        }
    }
    return;
}

function listTrees() {
    listStringBuilder = '';
    for (let i = 0; i < treeArray.length; i++) {
        listStringBuilder += treeArray[i].value + '\n';
        if (treeArray[i].children) {
            traverseTree(treeArray[i], 1);
        }

    }
    return;
}

function moveTree(line) {
    

}

function deleteTree(line) {
    let path = line.split('/');
    //handle exception for if Delete is run twice on a single object (already in treeArray)
    console.log(path);
    if (path.length === 1) {
        let newArray = [];
        for (let i = 0; i < treeArray.length; i++) {
            if (path[0] === treeArray[i]) {
                newArray = treeArray.splice(i, 1);
            }
        }
        treeArray = newArray;
    } else {
        for (var i = 0; i < treeArray.length; i++) {
            if (treeArray[i].value === path[0]) {
                console.log("Found match in array on " + treeArray[i].value);
                let targetNode = findPath(path, treeArray[i]);
                console.log(targetNode);
                targetNode.removeChild(path[path.length - 1]);
            }
        }
    }
    return;
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