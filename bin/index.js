#!/usr/bin/env node
const readline = require('readline');
const { TreeNode, copyTree } = require('../helpers/treehelper.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let multipleLines = [];
let commandText = '';
let treeArray = [];
let listStringBuilder = '';
let result = '';

// Helper function to assist with finding a path in a tree
// Input: A path in the form of a string
// Output: A TreeNode of the parent listed in the path
// I.E. If fruit/apples/fuji is input as path, the apples node should be output
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

// A helper function to allow for easier traversal through the directory tree
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

// Function performs initial processing of commands received from input stream
function processCommands(lines) {

    for (let i = 0; i < lines.length; i++) {
        let processedArray = lines[i].split(' ');
        if (processedArray[0] === "CREATE") {
            createNode(processedArray[1]);
            result += lines[i] + '\n';
        } else if (processedArray[0] === "LIST") {
            listTrees();
            result += "LIST" + '\n' + listStringBuilder; 
        } else if (processedArray[0] === "MOVE") {
            moveTree(processedArray[1], processedArray[2]);
            result += lines[i] + '\n';
        } else if (processedArray[0] === "DELETE") {
            result += lines[i] + '\n';
            deleteTree(processedArray[1]);
        } else {
            continue;
        }
    }
    console.log(result);
}

// A function to create a new node in the directory tree
function createNode(line) {
    let path = line.split('/');
    //handle exception for if Create is run twice on a single object (already in treeArray)
    if (path.length === 1) {
        let newTree = new TreeNode(path[0]);
        treeArray.push(newTree);
    } else {
        for (var i = 0; i < treeArray.length; i++) {
            if (treeArray[i].value === path[0]) {
                let targetNode = findPath(path, treeArray[i]);
                targetNode.addChild(path[path.length - 1]);
                break;
            }
        }
    }
    return;
}

// A function to combine a copied tree into a preexisting one
function combineTrees(line, rootNode) {
    let path = line.split('/');
    let newTree;
    if (path.length === 1) {
        newTree = new TreeNode(rootNode.value);
        treeArray.push(newTree);
    } else {
        for (var i = 0; i < treeArray.length; i++) {
            if (treeArray[i].value === path[0]) {
                let targetNode = findPath(path, treeArray[i]);
                newTree = targetNode.addChild(path[path.length - 1]);
            }
        }
    }
    copyTree(newTree, rootNode, newTree);
    return;
}

// A function to list the values of items in a tree in order
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

// A function to move one node (or tree) into another one
function moveTree(current, target) { // Need to move the node instead of deleting so the hierarchy can remain in tact
    let currentPath = current.split('/');
    let tempTree = deleteTree(current);
    target += '/' + currentPath[currentPath.length - 1];
    combineTrees(target, tempTree);
}

// A function to delete a node or tree that returns a temporary copy of the deleted node or tree
function deleteTree(line) {
    let path = line.split('/');
    let targetNode;
    let temp;
    if (path.length === 1) {
        let newArray = [];
        for (let i = 0; i < treeArray.length; i++) {
            if (path[0] != treeArray[i].value) {
                newArray.push(treeArray[i]);
            } else {
                temp = new TreeNode(path[0]);
                copiedTree = copyTree(temp, treeArray[i], temp);
            }
        }
        treeArray = newArray;
    } else {
        for (var i = 0; i < treeArray.length; i++) {
            if (treeArray[i].value === path[0]) {
                targetNode = findPath(path, treeArray[i]);
                temp = targetNode.removeChild(path[path.length - 1]); // returns temporary tree with deleted node as root
                break;
            }
        }
        if (temp === undefined || temp === '') {
            let pathBuilder = path.slice(0, path.length - 1);
            let invalidPath = '';
            for (let i = 0; i < pathBuilder.length; i++) {
                if (i < pathBuilder.length - 1) {
                    invalidPath += pathBuilder[i] + '/';
                } else {
                    invalidPath += pathBuilder;
                }

            }
            result += 'Cannot delete ' + line + ' - ' + invalidPath + ' does not exist' + '\n';
        }
    }
    return temp;
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