"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AVLnode_1 = require("./AVLnode");
var MarksTree = /** @class */ (function () {
    function MarksTree() {
        this.rootMarks = null;
    }
    MarksTree.prototype.getHeight = function (node) {
        return node ? node.height : 0;
    };
    MarksTree.prototype.updateHeight = function (node) {
        node.height = 1 + Math.max(this.getHeight(node.leftMarks), this.getHeight(node.rightMarks));
    };
    MarksTree.prototype.getBalanceFactor = function (node) {
        return this.getHeight(node.leftMarks) - this.getHeight(node.rightMarks);
    };
    //Insertion
    MarksTree.prototype.insertMarks = function (mark) {
        this.rootMarks = this.insertMarkData(this.rootMarks, mark);
    };
    MarksTree.prototype.insertMarkData = function (node, mark) {
        if (!node) {
            return new AVLnode_1.default(mark);
        }
        else if (mark < node.mark) {
            node.leftMarks = this.insertMarkData(node.leftMarks, mark);
            node;
        }
        else if (mark > node.mark) {
            node.rightMarks = this.insertMarkData(node.rightMarks, mark);
            node;
        }
        else {
            return node;
        }
        this.updateHeight(node);
        var balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor > 1) {
            var selectedNode = node.leftMarks;
            if (mark < selectedNode.mark) {
                return this.rightRotate(node);
            }
            else {
                node.leftMarks = this.leftRotate(node.leftMarks);
                return this.rightRotate(node);
            }
        }
        else if (balanceFactor < -1) {
            var selectedNode = node.leftMarks;
            if (mark > selectedNode.mark) {
                return this.leftRotate(node);
            }
            else {
                node.rightMarks = this.rightRotate(node.leftMarks);
                return this.leftRotate(node);
            }
        }
        return node;
    };
    MarksTree.prototype.rightRotate = function (node) {
        var x = node.leftMarks;
        var T2 = x.rightMarks;
        x.rightMarks = node;
        node.leftMarks = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    };
    MarksTree.prototype.leftRotate = function (node) {
        var x = node.rightMarks;
        var T2 = x.leftMarks;
        x.rightMarks = node;
        node.leftMarks = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    };
    //Search function
    MarksTree.prototype.searchMarks = function (mark) {
        var result = this.searchMarkData(this.rootMarks, mark);
        if (result) {
            return true;
        }
        return false;
    };
    MarksTree.prototype.searchMarkData = function (node, mark) {
        if (node === null) {
            return null;
        }
        else if (node.mark === mark) {
            return node;
        }
        if (mark < node.mark) {
            return this.searchMarkData(node.leftMarks, mark);
        }
        else {
            return this.searchMarkData(node.rightMarks, mark);
        }
    };
    //Deletion
    MarksTree.prototype.deleteMarks = function (mark) {
        this.rootMarks = this.deleteMarkData(this.rootMarks, mark);
    };
    MarksTree.prototype.deleteMarkData = function (node, mark) {
        if (node === null) {
            return null;
        }
        if (mark < node.mark) {
            node.leftMarks = this.deleteMarkData(node.leftMarks, mark);
        }
        else if (mark > node.mark) {
            node.rightMarks = this.deleteMarkData(node.rightMarks, mark);
        }
        else {
            //node is found
            if (node.rightMarks === null && node.leftMarks === null) {
                node = null;
            }
            else if (node.leftMarks === null) {
                node = node.rightMarks;
            }
            else if (node.rightMarks === null) {
                node = node.leftMarks;
            }
            else {
                var successor = this.findMinNode(node.rightMarks);
                node.mark = successor.mark;
                node.rightMarks = this.deleteMarkData(node.rightMarks, successor.mark);
            }
        }
        return node;
    };
    MarksTree.prototype.findMinNode = function (node) {
        while (node.leftMarks !== null) {
            node = node.leftMarks;
        }
        return node;
    };
    return MarksTree;
}());
var avl = new MarksTree();
avl.insertMarks(3);
avl.insertMarks(10);
avl.insertMarks(2);
avl.insertMarks(15);
avl.insertMarks(25);
console.log(avl);
