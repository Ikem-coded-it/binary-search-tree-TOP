/**
 * Balanced Binary Search Tree implementation in javascript
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr, start = 0, end = arr.length - 1) { // constructs a balanced binary tree from given array

        // Base case
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
        return node;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(root, value) {
        /*
         * If the tree is empty, return a new node
         */
        if (root == null) {
            root = new Node(value);
            return root;
        }
 
        /* Otherwise, recur down the tree */
        if (value < root.data)
            root.left = this.insert(root.left, value);
        else if (value > root.data)
            root.right = this.insert(root.right, value);
 
        /* return the (unchanged) node pointer */
        return root;
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        /* Base Case: If the tree is empty */
        if (root == null) return root;
  
        /* Otherwise, recur down the tree */
        if (value < root.data)
            root.left = this.deleteNode(root.left, value);
        else if (value > root.data)
            root.right = this.deleteNode(root.right, value);
  
        // if value is same as root's
        // value, then This is the
        // value to be deleted
        else {
            // if it's a leaf node
            if (!root.left && !root.right) return null;

            // value with only one child or no child
            if (!root.right && root.left) return root.left;
            if (!root.left && root.right) return root.right;

            // value with two children:
            root.data = this.minValue(root.right);
  
            // Delete the inorder successor
            root.right = this.deleteNode(root.right, root.data);
        }
  
        return root;
    }

    minValue(root) {
        let minv = root.data;
        while (root.left != null) {
            minv = root.left.value;
            root = root.left;
        }
        return minv;
    }

    find(root = this.root, value) {
       if (!root) {
        return false;
       } else {
        if (root.data === value) {
            return true;
        } else if (value > root.data) {
            return this.find(root.right, value)
        } else {
            return this.find(this.left, value)
        }
       }
    }

    levelOrder(root = this.root) {
        if (root == null) return;
        let queue = [];
        queue.push(root)
        let current;
        while (queue.length > 0) {
            console.log(queue[0]);

            if (queue[0].right != null) queue.push(queue[0].right)
            if (queue[0].left != null) queue.push(queue[0].left)
            queue.shift()
        }
    } 

    inOrder(root = this.root) {
        if (!root) {
            return null;
        }
        this.inOrder(root.left);
        console.log(root);
        this.inOrder(root.right);
    }

    preOrder(root = this.root) {
        if (!root) {
            return null;
        }
        console.log(root);
        this.preOrder(root.left);
        this.preOrder(root.right);
    }

    postOrder(root = this.root) {
        if (!root) {
            return null;
        }
        this.postOrder(root.left);
        this.postOrder(root.right);
        console.log(root);
    }

    height(node = this.root) {
        if (!node) return 0;

        let leftDepth = this.height(node.left)
        let rightDepth = this.height(node.right)

        return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1;
    }

    depth(root = this.root) {
        if (!root) return 0;
        return Math.max(this.depth(root.left), this.depth(root.right)) + 1;
    }

    isBalanced(root = this.root) {
        let leftHeight;
        let rightHeight;

        if (root == null) return 1;

        leftHeight = this.height(root.left)
        rightHeight = this.height(root.right)

        if (leftHeight - rightHeight <= 1 &&
            this.isBalanced(root.left) &&
            this.isBalanced(root.right)) return 1;

        return 0;    
    }
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7])
    // tree.insert(tree.root, 9)
    // tree.insert(tree.root, 12)
    // tree.delete(2)
    // console.log(tree.find(tree.root, 34));
    // tree.levelOrder();
    // tree.inOrder()
    // tree.preOrder()
    // tree.postOrder()
    // console.log(tree.height())
    // console.log(tree.depth())
    // console.log(tree.isBalanced())
    tree.prettyPrint();