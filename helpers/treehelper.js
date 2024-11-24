class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(value) {
            const newNode = new TreeNode(value);
            this.children.push(newNode);
            return newNode;
    }

    removeChild(value) {
        let newArray = [];
        let temp = new TreeNode(value);
        let pointer;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].value != value) {
                newArray.push(value);
            } else {
                pointer = this.children[i];
            }
        }
        copyTree(temp, pointer, temp);
        this.children = newArray;
        return temp;
    }
}

// Function performs a deep copy of a tree using the starting node as a root
function copyTree(copyToNode, copyFromNode, root) {
    if (!copyFromNode.children || copyFromNode.children.length === 0) {
        return root;
    }
    for (let i = 0; i < copyFromNode.children.length; i++) {
        let newTree = copyToNode.addChild(copyFromNode.children[i].value);
        return copyTree(newTree, copyFromNode.children[i]);
    }
}

module.exports = { TreeNode, copyTree };