(function(){
  class Node {
  	constructor(data, left = null, right = null) {
    	this.data = data;
      this.left = left;
      this.right = right;
    }
  }

  class BinarySearchTree {
  	constructor(data = null) {
    	this.root = new Node(data);
    }

    add(data) {
      let newNode = new Node(data);
      if(this.root.data == null) {
        this.root = newNode;
      } else {
        let node = this.root;
        while(node) {
          if(data < node.data) {
            if(node.left === null) {
              node.left = newNode;
              return;
            } else {
              node = node.left;
            }
          } else {
            if(node.right === null) {
              node.right = newNode;
              return;
            } else {
              node = node.right;
            }
          }
        }
      }
    }

  	find(data) {
    	let node = this.root;
      while(node) {
      	if(data < node.data) {
        	node = node.left;
        } else if (data > node.data) {
        	node = node.right;
        } else {
        	return node;
        }
      }
      return null;
    }

    findMinMax() {
      if(!this.root) {
        return null;
      }
      let min, max;
      let node = this.root;
      while(node.left) {
        node = node.left;
      }
      min = node.data;
      node = this.root;
      while(node.right) {
        node = node.right;
      }
      max = node.data;
      return { min, max };
    }

    findMinHeight(node = this.root) {
      if(!node) {
        return 0;
      }
      let left = this.findMinHeight(node.left);
      let right = this.findMinHeight(node.right);
      return 1 + Math.min(left, right);
    }

    findMaxHeight(node = this.root) {
      if(!node) {
        return 0;
      }
      let left = this.findMaxHeight(node.left);
      let right = this.findMaxHeight(node.right);
      return 1 + Math.max(left, right);
    }

    isTreeBalanced() {
      if(this.findMinHeight() >= this.findMaxHeight()) {
        return true;
      }
      return false;
    }

    preOrder() {
      let result = [];
      function preOrder(node) {
        result.push(node.data);
        node.left && preOrder(node.left);
        node.right && preOrder(node.right);
      }
      preOrder(this.root);
      return result;
    }

  	preOrderStack() {
    	let stack = [this.root];
      let result = [];
      let node;
      while(stack.length > 0) {
      	node = stack.pop();
        result.push(node.data);
        node.right && stack.push(node.right);
        node.left && stack.push(node.left);
      }
      return result;
    }

    inOrder() {
      let result = [];
      function inOrder(node) {
        node.left && inOrder(node.left);
        result.push(node.data);
        node.right && inOrder(node.right);
      }
      inOrder(this.root);
      return result;
    }

    inOrderStack() {
    	let stack = [this.root];
      let result = [];
      let node = this.root;
      while(node.left) {
        stack.push(node.left);
        node = node.left;
      }

      while(stack.length > 0) {
      	node = stack.pop();
        result.push(node.data);
        if(node.right) {
        	node = node.right;
          while(node) {
          	stack.push(node);
            node = node.left;
          }
        }
      }
      return result;
    }

    postOrder() {
      let result = [];
      function postOrder(node) {
        node.left && postOrder(node.left);
        node.right && postOrder(node.right);
        result.push(node.data);
      }
      postOrder(this.root);
      return result;
    }

    postOrderStack() {
    	let stack = [this.root];
      let result = [];
      let node;
      while(stack.length > 0) {
      	node = stack.pop();
        result.push(node.data);
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
      }
      return result.reverse();
    }

    levelOrder() {
      let result = [];
      let queue = [this.root];
      while(queue.length > 0) {
        let node = queue.shift();
        result.push(node.data);
        if(node.left) {
          queue.push(node.left);
        }
        if(node.right) {
          queue.push(node.right);
        }
      }
      return result;
    }
  }

  let bst = new BinarySearchTree(9);
  bst.add(4);
  bst.add(17);
  bst.add(3);
  bst.add(6);
  bst.add(22);
  bst.add(5);
  bst.add(7);
  bst.add(20);
  bst.add(10);
  console.log("BST Root - ", bst.root);
  console.log("BST Find - ", bst.find(6));
  console.log("BST MinHeight - ", bst.findMinHeight());
  console.log("BST MaxHeight - ", bst.findMaxHeight());
  console.log("BST Tree Balanced? - ", bst.isTreeBalanced());
  console.log("BST Min Max node - ", bst.findMinMax());
  console.log("DFS - In order traversal - ", bst.inOrder());
  console.log("DFS - inOrderStack traversal - ", bst.inOrderStack());
  console.log("DFS - Pre order traversal - ", bst.preOrder());
  console.log("DFS - preOrderStack traversal - ", bst.preOrderStack());
  console.log("DFS - Post order traversal - ", bst.postOrder());
  console.log("DFS - postOrderStack traversal - ", bst.postOrderStack());
  console.log("BFS - Level order traversal - ", bst.levelOrder());
})();
