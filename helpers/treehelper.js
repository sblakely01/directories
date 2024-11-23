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
}