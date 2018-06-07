(function(){
  var sum = function(a) {

    if(arguments.length ===3) {
      // Array.prototype.slice.call(arguments) || Array.from(arguments)
      return Array.prototype.slice.call(arguments).reduce((s,i) => s+i);
    } else {
      return function(b) {
        return function(c) {
          return a+b+c;
        }
      }
    }
  }
  console.log("sum---",sum(4)(5)(6), sum(4,5,6));

  let sum1 = a => b => c => a+b+c;
  console.log("sum1---",sum1(4)(5)(6));

  function palindrome(str) {
    for(let i=0, len=str.length; i<=len/2; i++) {
      if(str[i] != str[len-i-1]) {
        return false;
      }
    }
    return true;
    //return str == str.split("").reverse().join("");
  }
  console.log("palindrome---",palindrome("asdfdsa"));

  function duplicateArrays(ar1, ar2) {
    let duplicates = new Set();
    let smallArr = ar1;
    let bigArr = ar2;
    if(ar1.length > ar2.length) {
      smallArr = ar2;
      bigArr = ar1;
    }
    for(let i=0, len=bigArr.length; i<len; i++) {
      if(i<smallArr.length && bigArr.indexOf(smallArr[i]) != -1) {
        duplicates.add(smallArr[i]);
      }
      if(smallArr.indexOf(bigArr[i]) != -1) {
        duplicates.add(bigArr[i]);
      }
    }
    return Array.from(duplicates);
    //Convert set to array  Array.from(set) || [...set]
  }
  console.log("duplicateArrays---",duplicateArrays([1,2,3,4,5], [1,2,3])); // duplicateArrays--- (3) [1, 2, 3]


  function duplicateArrays2(ar1, ar2) {
    let duplicates = new Set();
    let smallArr = ar1;
    let bigArr = ar2;
    if(ar1.length > ar2.length) {
      smallArr = ar2;
      bigArr = ar1;
    }
    for(let i=0, len=smallArr.length; i<len; i++) {
      if(bigArr.indexOf(smallArr[i]) != -1) {
        duplicates.add(smallArr[i]);
      }
    }
    return Array.from(duplicates);
  }
  console.log("duplicateArrays2---",duplicateArrays2([1,2,3,4,5], [1,2,3])); // duplicateArrays--- (3) [1, 2, 3]


  /*READING HUGE FILE IN CHUNKS AND CREATE WEB SETVICE API
  var CHUNK_SIZE = 10 * 1024 * 1024, // 10MB
    buffer = new Buffer(CHUNK_SIZE),
    filePath = '/tmp/foo';

  fs.open(filePath, 'r', function(err, fd) {
  if (err) throw err;
  function readNextChunk() {
    fs.read(fd, buffer, 0, CHUNK_SIZE, null, function(err, nread) {
      if (err) throw err;

      if (nread === 0) {
        // done reading file, do any necessary finalization steps

        fs.close(fd, function(err) {
          if (err) throw err;
        });
        return;
      }

      var data;
      if (nread < CHUNK_SIZE)
        data = buffer.slice(0, nread);
      else
        data = buffer;

      // do something with `data`, then call `readNextChunk();`
    });
  }
  readNextChunk();
  });*/

  function divideNoDivide(num, div) {
    if(div === 0) {
      return 0;
    }
    let count = 0;
    let rem = 0;
    while(num >= div) {
      num -= div;
      count++;
      if(num<div) {
        rem = num;
      }
    }
    return {count, rem};
  }
  console.log("divideNoDivide---", divideNoDivide(15,5)); // divideNoDivide--- {count: 3, rem: 0}


  function maximizeStocksProfit(stocks) {
    let buy = 0,
        sell = 0,
        cheap = 0,
        profit = 0;
    for(let i=1, len = stocks.length; i< len; i++) {
      if(stocks[i] < stocks[cheap]) {
        cheap = i;
      } else if (stocks[i] - stocks[cheap] > profit) {
        buy = cheap;
        sell = i;
        profit = stocks[i] - stocks[cheap];
      }
    }
    console.log({ buy, sell, profit});
  }
  maximizeStocksProfit([10, 99, 100, 1, 50, 99]); // O(n) - {buy: 3, sell: 5, profit: 98}

  function maxSumConsecutiveNumbers(arr) {
    let max = sum = arr[0];
    for(let i=1; i<arr.length; i++) {
      sum = Math.max(arr[i], arr[i]+sum);
      if(sum > max)
        max = sum;
    }
    console.log('maxSumConsecutiveNumbers---', max);
  }
  maxSumConsecutiveNumbers([-2, 3, 2, -1, 3, 3]); // O(n) 10


  function brackets(output, open, close, pairs) {
      if(close==pairs) {
          console.log(output);
      } else {
          if(open<pairs)
              brackets(output + "(", open+1, close, pairs);
          if(close<open)
              brackets(output + ")", open, close+1, pairs);
      }
  }

  brackets("", 0, 0, 4); //O(Cn)


  function loopInArray(arr) {
    let i = arr[0],
        j = arr[0],
        len = arr.length,
        isLoop = false;

    while(true) {
      if(i < 0 || i > len-1 || j < 0 || j > len-1) {
        break;
      }
      i = arr[i];
      if(i < 0 || i > len-1) {
        break;
      }
      if(i == j) {
        isLoop = true;
        break;
      }
      i = arr[i];
      if(i < 0 || i > len-1) {
        break;
      }
      if(i == j) {
        isLoop = true;
        break;
      }
      j = arr[j];
      if(j < 0 || j > len-1) {
        break;
      }
      if(i==j) {
        isLoop = true;
        break;
      }
    }
    console.log(isLoop);
  }
  loopInArray([1, 2, 3, 4, 5, 3]); // O(n) // true


  function sourceDestination(boardingPasses) {
    let sources = new Set();
    let destinations = new Set();
    for(let i=0; i<boardingPasses.length; i++) {
      sources.add(boardingPasses[i][0]);
      destinations.add(boardingPasses[i][1]);
      if(destinations.has(boardingPasses[i][0])) {
        sources.delete(boardingPasses[i][0]);
        destinations.delete(boardingPasses[i][0]);
      }
      if(sources.has(boardingPasses[i][1])) {
        sources.delete(boardingPasses[i][1]);
        destinations.delete(boardingPasses[i][1]);
      }
    }
    console.log(sources, destinations);
  }
  sourceDestination([[4,5], [1,4], [6,8], [5, 6]]); // O(n) 1,8


  function balancePointInanArray(arr) {
    let leftSum = 0;
    let leftSumArr = [0];
    let rightSum = 0;
    let rightSumArr = [0];
    for(let i=1; i< arr.length; i++) {
      leftSum = leftSum+arr[i-1];
      leftSumArr.push(leftSum);
      rightSum = rightSum+arr[arr.length-i];
      rightSumArr.unshift(rightSum);
    }
    for(let i=0; i<arr.length; i++) {
      if(leftSumArr[i] == rightSumArr[i]) {
        return {i}
      }
    }
    return null;
  }
  console.log(balancePointInanArray([-1,1,2,1,1,2,5,1,5]));   // O(n) {i: 6}



  function fibonacci(n){
    let a = 1,
        b = 1,
        c = 0;
    if(n >= 0) {
      console.log(0);
    }
    if(n >= 1) {
      console.log(1);
    }
    if(n >= 2) {
      console.log(1);;
    }
    for(let i=2; i<n; i++) {
      c = a + b;
      console.log(c)
      a = b;
      b = c;
    }
  }
  fibonacci(10);



  function sumOfPairsInArray(arr, sum) {
    let low = 0,
        high = arr.length-1;
    while(low < high) {
      if(arr[low] + arr[high] == sum) {
        return {low, high, sum: arr[low] + arr[high]};
        break;
      } else if (arr[low] + arr[high] < sum) {
        low++;
      } else {
        high--;
      }
    }
    return null;
  }
  console.log(sumOfPairsInArray([1,2,4,6,9], 8)); // Sorted O(n) {low: 1, high: 3, sum: 8}


  function sumOfPairsInArray(arr, sum) {
    let memory = new Set();
    for(let i=0; i<arr.length; i++) {
      if(memory.has(arr[i])) {
        return {1: arr[i], 2: sum - arr[i]};
      } else {
        memory.add(sum - arr[i]);
      }
    }
    return false;
  }
  console.log(sumOfPairsInArray([1, 2, 4, 4], 8)); // Unsorted O(n) {1: 4, 2: 4}

  // Single Linked List
  function Node(val) {
    this.prev = null;
    this.data = val;
    this.next = null;
  }

  function SingleLinkedList() {
    this.root = null;
  }

  SingleLinkedList.prototype.add = (val) => {
    if(!this.root) {
      this.root = new Node(val);
    } else {
      let node = this.root;
      while(node.next) {
        node = node.next;
      }
      node.next = new Node(val);
    }
  }

  SingleLinkedList.prototype.get = () => {
    return this.root;
  }

  SingleLinkedList.prototype.reverse = () => {
    let currentNode = this.root;
    let prev = null;
    while(currentNode) {
      let next = currentNode.next;
      currentNode.next = prev;
      prev = currentNode;
      currentNode = next;
    }
    this.root = prev;
  }

  let sll = new SingleLinkedList();
  sll.add(1);
  sll.add(2);
  sll.add(3);
  console.log(JSON.stringify(sll.get()));
  // {"data":1,"next":{"data":2,"next":{"data":3,"next":null}}}
  sll.reverse();
  console.log(JSON.stringify(sll.get()));
  // {"data":3,"next":{"data":2,"next":{"data":1,"next":null}}}


  // Double Linked List
  function DoubllyLinkedList() {
    this.doubleRoot = null;
  }

  DoubllyLinkedList.prototype.add = (val) => {
    if(!this.doubleRoot) {
      this.doubleRoot = new Node(val);
    } else {
      let node = this.doubleRoot;
      while(node.next) {
        node = node.next;
      }
      node.next = new Node(val);
      node.next.prev = node;
    }
  }

  DoubllyLinkedList.prototype.get = () => {
    return this.doubleRoot;
  }

  DoubllyLinkedList.prototype.reverse = () => {
    let currentNode = this.doubleRoot;
    let prev = null;
    while(currentNode) {
      let next = currentNode.next;
      currentNode.next = prev;
      currentNode.prev = next
      prev = currentNode;
      currentNode = next;
    }
    this.doubleRoot = prev;
  }

  let dll = new DoubllyLinkedList();
  dll.add(1);
  dll.add(2);
  dll.add(3);
  console.log(dll.get());
  dll.reverse();
  console.log(dll.get());

  // Find the lowest common ancestors to 2 nodes in a binary tree.
  const lowestCommonAncestor = (node, n1, n2) => {
    if(node == null) return null;
    if(node == n1 || node == n2) return node;
    let left = lowestCommonAncestor(node.left, n1, n2);
    let right = lowestCommonAncestor(node.right, n1, n2);
    if(left != null && right != null) return node;
    if(left == null && right == null) return null;
    return left != null ? left : right;
  }

  const sumCoins = (sum, currentCoin = 0) => {
    if(sum===0) return 1;
    if(sum<0) return 0;
    let totalSum = 0;
    for(let i=currentCoin; i<coins.length; i++) {
      totalSum += sumCoins(sum-coins[i], i);
    }
    return totalSum;
  }

  const coins = [1, 2, 3];
  console.log(sumCoins(4));



/*  Dynamic Programming
    0 1 2 3 4 5 6 7 8
  2 1 0 1 0 1 0 1 0 1
  3 1 0 1 1 1 1 2 1 2
  5 1 0 1 1 1 2 2 2 3
*/

  const dpSumCoins = (sum) => {
    const coins = [1, 2, 3];
    let arr = [];
    for(let j=0;j<coins.length; j++) {
      arr.push([1]);
    }
    console.log(arr);
    for(let i=0; i< coins.length; i++) {
      for(let j=1; j<=sum; j++) {
        if(i==0) {
          if(j%coins[i] == 0) {
            arr[i][j] = 1;
          } else {
            arr[i][j] = 0;
          }
        } else {
          if(j >= coins[i]) {
            arr[i][j] = arr[i-1][j] + arr[i][j-coins[i]];
          } else {
            arr[i][j] = arr[i-1][j];
          }
        }
      }
    }
    return arr[coins.length-1][sum];
  }

  console.log(dpSumCoins(4));
})();
