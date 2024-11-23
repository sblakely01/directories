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
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] != value) {
                newArray.push(value);
            }
        }
        this.children = newArray;
    }
}

module.exports = { TreeNode };