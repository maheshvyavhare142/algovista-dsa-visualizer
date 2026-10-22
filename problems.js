const makeProblem = (difficulty, index, details) => ({
  id: `${difficulty}-${index + 1}`,
  difficulty,
  slug: details.slug,
  title: details.title,
  description: details.description,
  concepts: details.concepts,
  starterCode: details.starterCode,
  visualizationFocus: details.visualizationFocus,
  sampleInput: details.sampleInput,
  sampleOutput: details.sampleOutput,
});

const easySeeds = [
  {
    slug: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    concepts: ["arrays", "hash map"],
    starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [-1, -1];
}`,
    visualizationFocus: ["hashLookups", "pairsTested"],
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
  },
  {
    slug: "reverse-string",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. Input string is given as an array of characters s.",
    concepts: ["two pointers"],
    starterCode: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`,
    visualizationFocus: ["pointerMovement", "swaps"],
    sampleInput: "s = ['h','e','l','l','o']",
    sampleOutput: "['o','l','l','e','h']",
  },
  {
    slug: "fibonacci-number",
    title: "Fibonacci Number",
    description:
      "Given n, calculate the n-th Fibonacci number using dynamic programming.",
    concepts: ["dynamic programming"],
    starterCode: `function fib(n) {
  if (n <= 1) return n;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`,
    visualizationFocus: ["sequenceProgression"],
    sampleInput: "n = 6",
    sampleOutput: "8",
  },
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    concepts: ["stack"],
    starterCode: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (!pairs[ch]) {
      stack.push(ch);
    } else if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }
  return stack.length === 0;
}`,
    visualizationFocus: ["stackSize", "matchesFound"],
    sampleInput: "s = '({[]})'",
    sampleOutput: "true",
  },
  {
    slug: "merge-sorted-array",
    title: "Merge Sorted Array",
    description:
      "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, merge nums2 into nums1 as one sorted array.",
    concepts: ["two pointers"],
    starterCode: `function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
  return nums1;
}`,
    visualizationFocus: ["pointerMovement", "placements"],
    sampleInput: "nums1 = [1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3",
    sampleOutput: "[1,2,2,3,5,6]",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    description:
      "Implement binary search to find the index of target in a sorted array nums. Return -1 if not found.",
    concepts: ["binary search"],
    starterCode: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    visualizationFocus: ["midPoints", "searchBounds"],
    sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
    sampleOutput: "4",
  },
  {
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    concepts: ["dynamic programming"],
    starterCode: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev1 = 2;
  let prev2 = 1;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    visualizationFocus: ["sequenceProgression"],
    sampleInput: "n = 5",
    sampleOutput: "8",
  },
  {
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray with the largest sum.",
    concepts: ["kadane's algorithm"],
    starterCode: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}`,
    visualizationFocus: ["runningSum", "maxUpdates"],
    sampleInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    sampleOutput: "6",
  },
  {
    slug: "counting-bits",
    title: "Counting Bits",
    description:
      "Given an integer n, return an array ans of length n + 1 where ans[i] is the number of 1's in the binary representation of i.",
    concepts: ["bit manipulation", "dynamic programming"],
    starterCode: `function countBits(n) {
  const res = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    res[i] = res[i >> 1] + (i & 1);
  }
  return res;
}`,
    visualizationFocus: ["bitCounts"],
    sampleInput: "n = 5",
    sampleOutput: "[0,1,1,2,1,2]",
  },
  {
    slug: "single-number",
    title: "Single Number",
    description:
      "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    concepts: ["bit manipulation"],
    starterCode: `function singleNumber(nums) {
  return nums.reduce((acc, num) => acc ^ num, 0);
}`,
    visualizationFocus: ["xorOps"],
    sampleInput: "nums = [4,1,2,1,2]",
    sampleOutput: "4",
  },
  {
    slug: "plus-one",
    title: "Plus One",
    description:
      "You are given a large integer represented as an integer array digits, increment the large integer by one and return the resulting array of digits.",
    concepts: ["arrays"],
    starterCode: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}`,
    visualizationFocus: ["carryOperations"],
    sampleInput: "digits = [9,9,9]",
    sampleOutput: "[1,0,0,0]",
  },
  {
    slug: "move-zeroes",
    title: "Move Zeroes",
    description:
      "Given an integer array nums, move all 0's to the end while maintaining the relative order of the non-zero elements.",
    concepts: ["two pointers"],
    starterCode: `function moveZeroes(nums) {
  let insertPos = 0;
  for (const num of nums) {
    if (num !== 0) {
      nums[insertPos++] = num;
    }
  }
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
  return nums;
}`,
    visualizationFocus: ["pointerMovement", "writes"],
    sampleInput: "nums = [0,1,0,3,12]",
    sampleOutput: "[1,3,12,0,0]",
  },
  {
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    description:
      "Given an array prices where prices[i] is the price on the ith day, maximize profit by choosing a day to buy one stock and a different day in the future to sell.",
    concepts: ["greedy"],
    starterCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
    visualizationFocus: ["minTracking", "profitUpdates"],
    sampleInput: "prices = [7,1,5,3,6,4]",
    sampleOutput: "5",
  },
  {
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    description:
      "Return true if the given string is a palindrome, considering only alphanumeric characters and ignoring cases.",
    concepts: ["two pointers"],
    starterCode: `function isPalindrome(s) {
  const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = filtered.length - 1;
  while (left < right) {
    if (filtered[left++] !== filtered[right--]) return false;
  }
  return true;
}`,
    visualizationFocus: ["pointerMovement", "comparisons"],
    sampleInput: "s = 'A man, a plan, a canal: Panama'",
    sampleOutput: "true",
  },
  {
    slug: "intersection-of-two-arrays",
    title: "Intersection of Two Arrays",
    description:
      "Given two integer arrays nums1 and nums2, return an array of their intersection. Each result must be unique.",
    concepts: ["hash set"],
    starterCode: `function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const res = new Set();
  for (const num of nums2) {
    if (set1.has(num)) res.add(num);
  }
  return Array.from(res);
}`,
    visualizationFocus: ["setMembership"],
    sampleInput: "nums1 = [1,2,2,1], nums2 = [2,2]",
    sampleOutput: "[2]",
  },
  {
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array.",
    concepts: ["hash set"],
    starterCode: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
    visualizationFocus: ["setSize", "duplicatesFound"],
    sampleInput: "nums = [1,2,3,1]",
    sampleOutput: "true",
  },
  {
    slug: "ransom-note",
    title: "Ransom Note",
    description:
      "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine.",
    concepts: ["hash map", "frequency counting"],
    starterCode: `function canConstruct(ransomNote, magazine) {
  const freq = new Map();
  for (const ch of magazine) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }
  for (const ch of ransomNote) {
    const count = freq.get(ch) || 0;
    if (count === 0) return false;
    freq.set(ch, count - 1);
  }
  return true;
}`,
    visualizationFocus: ["frequencyMap", "charsConsumed"],
    sampleInput: "ransomNote = 'aa', magazine = 'aab'",
    sampleOutput: "true",
  },
  {
    slug: "first-unique-character",
    title: "First Unique Character in a String",
    description:
      "Given a string s, find the first non-repeating character and return its index.",
    concepts: ["hash map", "string"],
    starterCode: `function firstUniqChar(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}`,
    visualizationFocus: ["frequencyMap", "indexScan"],
    sampleInput: "s = 'leetcode'",
    sampleOutput: "0",
  },
  {
    slug: "maximum-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    description:
      "Given the root of a binary tree, return its maximum depth.",
    concepts: ["dfs", "recursion"],
    starterCode: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    visualizationFocus: ["recursionDepth"],
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "3",
  },
  {
    slug: "symmetric-tree",
    title: "Symmetric Tree",
    description:
      "Check whether a binary tree is symmetric around its center.",
    concepts: ["dfs", "recursion"],
    starterCode: `function isSymmetric(root) {
  if (!root) return true;
  const isMirror = (t1, t2) => {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return t1.val === t2.val &&
      isMirror(t1.left, t2.right) &&
      isMirror(t1.right, t2.left);
  };
  return isMirror(root.left, root.right);
}`,
    visualizationFocus: ["mirrorComparisons"],
    sampleInput: "root = [1,2,2,3,4,4,3]",
    sampleOutput: "true",
  },
  {
    slug: "path-sum",
    title: "Path Sum",
    description:
      "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path summing to targetSum.",
    concepts: ["dfs", "recursion"],
    starterCode: `function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  const newTarget = targetSum - root.val;
  return hasPathSum(root.left, newTarget) || hasPathSum(root.right, newTarget);
}`,
    visualizationFocus: ["pathTracking", "sumProgress"],
    sampleInput: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
    sampleOutput: "true",
  },
  {
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    description:
      "Invert a binary tree so that the left and right children of every node are swapped.",
    concepts: ["dfs"],
    starterCode: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
    visualizationFocus: ["swaps", "recursionDepth"],
    sampleInput: "root = [4,2,7,1,3,6,9]",
    sampleOutput: "[4,7,2,9,6,3,1]",
  },
  {
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    description:
      "Given head, determine if the linked list has a cycle using Floyd's cycle-finding algorithm.",
    concepts: ["two pointers"],
    starterCode: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    visualizationFocus: ["pointerMovement"],
    sampleInput: "head = [3,2,0,-4], pos=1",
    sampleOutput: "true",
  },
  {
    slug: "middle-of-linked-list",
    title: "Middle of the Linked List",
    description:
      "Given the head of a singly linked list, return the middle node.",
    concepts: ["two pointers"],
    starterCode: `function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
    visualizationFocus: ["pointerMovement"],
    sampleInput: "head = [1,2,3,4,5]",
    sampleOutput: "Node with value 3",
  },
  {
    slug: "remove-linked-list-elements",
    title: "Remove Linked List Elements",
    description:
      "Remove all elements from a linked list that have value val.",
    concepts: ["linked list"],
    starterCode: `function removeElements(head, val) {
  const dummy = { next: head };
  let current = dummy;
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return dummy.next;
}`,
    visualizationFocus: ["pointerMovement", "removals"],
    sampleInput: "head = [1,2,6,3,4,5,6], val = 6",
    sampleOutput: "[1,2,3,4,5]",
  },
  {
    slug: "min-stack",
    title: "Min Stack",
    description:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    concepts: ["stack"],
    starterCode: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
    visualizationFocus: ["stackSize", "minTracking"],
    sampleInput: "Push [2,0,3,0], getMin, pop, getMin",
    sampleOutput: "Returns 0, then 0, then 0, then 0",
  },
  {
    slug: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    description:
      "Determine if a binary tree is height-balanced.",
    concepts: ["dfs"],
    starterCode: `function isBalanced(root) {
  const dfs = (node) => {
    if (!node) return { height: 0, balanced: true };
    const left = dfs(node.left);
    const right = dfs(node.right);
    const balanced =
      left.balanced &&
      right.balanced &&
      Math.abs(left.height - right.height) <= 1;
    return {
      height: Math.max(left.height, right.height) + 1,
      balanced,
    };
  };
  return dfs(root).balanced;
}`,
    visualizationFocus: ["heightDiff"],
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "true",
  },
  {
    slug: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    description:
      "Return the level order traversal of a binary tree's nodes' values.",
    concepts: ["bfs"],
    starterCode: `function levelOrder(root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
    visualizationFocus: ["queueState", "levels"],
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "[[3],[9,20],[15,7]]",
  },
  {
    slug: "power-of-two",
    title: "Power of Two",
    description:
      "Given an integer n, return true if it is a power of two.",
    concepts: ["bit manipulation"],
    starterCode: `function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}`,
    visualizationFocus: ["bitOperations"],
    sampleInput: "n = 16",
    sampleOutput: "true",
  },
  {
    slug: "number-of-1-bits",
    title: "Number of 1 Bits",
    description:
      "Write a function that returns the number of '1' bits in the binary representation of a given integer.",
    concepts: ["bit manipulation"],
    starterCode: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    count++;
    n &= n - 1;
  }
  return count;
}`,
    visualizationFocus: ["bitOperations"],
    sampleInput: "n = 11",
    sampleOutput: "3",
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    description:
      "Given two strings s and t, return true if t is an anagram of s.",
    concepts: ["hash map", "sorting"],
    starterCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Map();
  for (const ch of s) {
    count.set(ch, (count.get(ch) || 0) + 1);
  }
  for (const ch of t) {
    const curr = count.get(ch) || 0;
    if (curr === 0) return false;
    count.set(ch, curr - 1);
  }
  return true;
}`,
    visualizationFocus: ["frequencyMap"],
    sampleInput: "s = 'anagram', t = 'nagaram'",
    sampleOutput: "true",
  },
  {
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    description:
      "Merge two sorted linked lists and return it as a sorted list.",
    concepts: ["linked list"],
    starterCode: `function mergeTwoLists(list1, list2) {
  const dummy = { next: null };
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`,
    visualizationFocus: ["pointerMovement", "merges"],
    sampleInput: "list1 = [1,2,4], list2 = [1,3,4]",
    sampleOutput: "[1,1,2,3,4,4]",
  },
  {
    slug: "merge-intervals",
    title: "Merge Intervals",
    description:
      "Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals.",
    concepts: ["sorting", "intervals"],
    starterCode: `function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = res[res.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      res.push([start, end]);
    }
  }
  return res;
}`,
    visualizationFocus: ["intervalMerges"],
    sampleInput: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
    sampleOutput: "[[1,6],[8,10],[15,18]]",
  },
  {
    slug: "valid-sudoku",
    title: "Valid Sudoku",
    description:
      "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated.",
    concepts: ["hash set"],
    starterCode: `function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;
      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIndex].has(val)) {
        return false;
      }
      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIndex].add(val);
    }
  }
  return true;
}`,
    visualizationFocus: ["setChecks"],
    sampleInput: "board = valid sudoku grid",
    sampleOutput: "true",
  },
  {
    slug: "flood-fill",
    title: "Flood Fill",
    description:
      "An image is represented by a 2-D array. Perform a flood fill starting from sr, sc with newColor.",
    concepts: ["dfs", "bfs"],
    starterCode: `function floodFill(image, sr, sc, newColor) {
  const original = image[sr][sc];
  if (original === newColor) return image;
  const rows = image.length;
  const cols = image[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (image[r][c] !== original) return;
    image[r][c] = newColor;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  dfs(sr, sc);
  return image;
}`,
    visualizationFocus: ["cellsVisited"],
    sampleInput: "image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2",
    sampleOutput: "[[2,2,2],[2,2,0],[2,0,1]]",
  },
  {
    slug: "valid-graph-tree",
    title: "Graph Valid Tree",
    description:
      "Given n nodes labeled from 0 to n-1 and a list of undirected edges, determine if these edges form a valid tree.",
    concepts: ["union find", "graph"],
    starterCode: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false;
    parent[rootB] = rootA;
    return true;
  };
  for (const [u, v] of edges) {
    if (!union(u, v)) return false;
  }
  return true;
}`,
    visualizationFocus: ["unions", "cyclesDetected"],
    sampleInput: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
    sampleOutput: "true",
  },
];

const mediumSeeds = [
  {
    slug: "three-sum",
    title: "3Sum",
    description:
      "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that they sum to zero.",
    concepts: ["two pointers", "sorting"],
    starterCode: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return res;
}`,
    visualizationFocus: ["pointerMovement", "tripletsFound"],
    sampleInput: "nums = [-1,0,1,2,-1,-4]",
    sampleOutput: "[[-1,-1,2],[-1,0,1]]",
  },
  {
    slug: "group-anagrams",
    title: "Group Anagrams",
    description:
      "Given an array of strings strs, group the anagrams together.",
    concepts: ["hash map", "sorting"],
    starterCode: `function groupAnagrams(strs) {
  const map = new Map();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }
  return Array.from(map.values());
}`,
    visualizationFocus: ["grouping"],
    sampleInput: "strs = ['eat','tea','tan','ate','nat','bat']",
    sampleOutput: "[['eat','tea','ate'],['tan','nat'],['bat']]",
  },
  {
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    description:
      "Return the k most frequent elements in a non-empty array nums.",
    concepts: ["heap", "bucket sort"],
    starterCode: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  const buckets = Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    for (const num of buckets[i]) {
      res.push(num);
      if (res.length === k) break;
    }
  }
  return res;
}`,
    visualizationFocus: ["frequencyMap", "bucketFill"],
    sampleInput: "nums = [1,1,1,2,2,3], k = 2",
    sampleOutput: "[1,2]",
  },
  {
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    description:
      "Given an integer array nums, return an array answer such that answer[i] is the product of all elements of nums except nums[i].",
    concepts: ["prefix product"],
    starterCode: `function productExceptSelf(nums) {
  const res = new Array(nums.length).fill(1);
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`,
    visualizationFocus: ["prefixProduct", "suffixProduct"],
    sampleInput: "nums = [1,2,3,4]",
    sampleOutput: "[24,12,8,6]",
  },
  {
    slug: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    concepts: ["sliding window"],
    starterCode: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (map.has(ch) && map.get(ch) >= left) {
      left = map.get(ch) + 1;
    }
    map.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    visualizationFocus: ["windowBounds", "maxUpdates"],
    sampleInput: "s = 'abcabcbb'",
    sampleOutput: "3",
  },
  {
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    concepts: ["expand around center"],
    starterCode: `function longestPalindrome(s) {
  if (s.length < 2) return s;
  let start = 0;
  let end = 0;
  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  };
  for (let i = 0; i < s.length; i++) {
    const [l1, r1] = expand(i, i);
    const [l2, r2] = expand(i, i + 1);
    if (r1 - l1 > end - start) [start, end] = [l1, r1];
    if (r2 - l2 > end - start) [start, end] = [l2, r2];
  }
  return s.slice(start, end + 1);
}`,
    visualizationFocus: ["centerExpansion"],
    sampleInput: "s = 'babad'",
    sampleOutput: "'bab'",
  },
  {
    slug: "course-schedule",
    title: "Course Schedule",
    description:
      "Given the total number of courses and prerequisites, determine if you can finish all courses.",
    concepts: ["graph", "topological sort"],
    starterCode: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = Array(numCourses).fill(0);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    indegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }
  let taken = 0;
  while (queue.length) {
    const node = queue.shift();
    taken++;
    for (const next of graph[node]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return taken === numCourses;
}`,
    visualizationFocus: ["indegree", "queueState"],
    sampleInput: "numCourses = 2, prerequisites = [[1,0]]",
    sampleOutput: "true",
  },
  {
    slug: "number-of-islands",
    title: "Number of Islands",
    description:
      "Given an m x n grid of '1's and '0's, return the number of islands.",
    concepts: ["dfs", "bfs"],
    starterCode: `function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
    visualizationFocus: ["cellsVisited"],
    sampleInput: "grid = [['1','1','0'],['1','1','0'],['0','0','1']]",
    sampleOutput: "2",
  },
  {
    slug: "rotate-image",
    title: "Rotate Image",
    description:
      "You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees (clockwise).",
    concepts: ["matrix"],
    starterCode: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
  return matrix;
}`,
    visualizationFocus: ["transpositions", "rowReversals"],
    sampleInput: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
    sampleOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
  },
  {
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    description:
      "Given a list of daily temperatures, return a list such that each element is the number of days to wait until a warmer temperature.",
    concepts: ["stack"],
    starterCode: `function dailyTemperatures(temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prev = stack.pop();
      res[prev] = i - prev;
    }
    stack.push(i);
  }
  return res;
}`,
    visualizationFocus: ["stackState", "resUpdates"],
    sampleInput: "temperatures = [73,74,75,71,69,72,76,73]",
    sampleOutput: "[1,1,4,2,1,1,0,0]",
  },
  {
    slug: "min-window-substring",
    title: "Minimum Window Substring",
    description:
      "Given two strings s and t, return the minimum window substring of s that contains all characters of t.",
    concepts: ["sliding window"],
    starterCode: `function minWindow(s, t) {
  if (t.length === 0) return '';
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let have = 0;
  let required = need.size;
  const window = new Map();
  let res = [-1, -1];
  let resLen = Infinity;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) || 0) + 1);
    if (need.has(ch) && window.get(ch) === need.get(ch)) have++;
    while (have === required) {
      if (right - left + 1 < resLen) {
        res = [left, right];
        resLen = right - left + 1;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
        have--;
      }
      left++;
    }
  }
  if (resLen === Infinity) return '';
  return s.slice(res[0], res[1] + 1);
}`,
    visualizationFocus: ["windowBounds", "frequencyBalance"],
    sampleInput: "s = 'ADOBECODEBANC', t = 'ABC'",
    sampleOutput: "'BANC'",
  },
  {
    slug: "kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    description:
      "Given the root of a binary search tree and an integer k, return the kth smallest value.",
    concepts: ["bst", "inorder traversal"],
    starterCode: `function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    count++;
    if (count === k) return current.val;
    current = current.right;
  }
  return null;
}`,
    visualizationFocus: ["inorderTraversal"],
    sampleInput: "root = [3,1,4,null,2], k = 1",
    sampleOutput: "1",
  },
  {
    slug: "validate-bst",
    title: "Validate Binary Search Tree",
    description:
      "Given the root of a binary tree, determine if it is a valid BST.",
    concepts: ["dfs"],
    starterCode: `function isValidBST(root) {
  const validate = (node, low, high) => {
    if (!node) return true;
    if ((low !== null && node.val <= low) || (high !== null && node.val >= high)) {
      return false;
    }
    return (
      validate(node.left, low, node.val) &&
      validate(node.right, node.val, high)
    );
  };
  return validate(root, null, null);
}`,
    visualizationFocus: ["boundsUpdates"],
    sampleInput: "root = [2,1,3]",
    sampleOutput: "true",
  },
  {
    slug: "zigzag-level-order",
    title: "Binary Tree Zigzag Level Order Traversal",
    description:
      "Return the zigzag level order traversal of a binary tree.",
    concepts: ["bfs"],
    starterCode: `function zigzagLevelOrder(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  let leftToRight = true;
  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (leftToRight) level.push(node.val);
      else level.unshift(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
    leftToRight = !leftToRight;
  }
  return res;
}`,
    visualizationFocus: ["levels", "directionSwitch"],
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "[[3],[20,9],[15,7]]",
  },
  {
    slug: "combination-sum",
    title: "Combination Sum",
    description:
      "Given a set of candidate numbers and a target, find all unique combinations that sum to target. Reuse of elements allowed.",
    concepts: ["backtracking"],
    starterCode: `function combinationSum(candidates, target) {
  const res = [];
  const path = [];
  const dfs = (start, total) => {
    if (total === target) {
      res.push([...path]);
      return;
    }
    if (total > target) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, total + candidates[i]);
      path.pop();
    }
  };
  dfs(0, 0);
  return res;
}`,
    visualizationFocus: ["recursionTree"],
    sampleInput: "candidates = [2,3,6,7], target = 7",
    sampleOutput: "[[2,2,3],[7]]",
  },
  {
    slug: "permutations",
    title: "Permutations",
    description:
      "Given an array nums, return all possible permutations.",
    concepts: ["backtracking"],
    starterCode: `function permute(nums) {
  const res = [];
  const used = new Array(nums.length).fill(false);
  const path = [];
  const dfs = () => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return res;
}`,
    visualizationFocus: ["recursionTree"],
    sampleInput: "nums = [1,2,3]",
    sampleOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
  },
  {
    slug: "word-break",
    title: "Word Break",
    description:
      "Given a string s and a dictionary wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
    concepts: ["dynamic programming"],
    starterCode: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
    visualizationFocus: ["dpTable"],
    sampleInput: "s = 'leetcode', wordDict = ['leet','code']",
    sampleOutput: "true",
  },
  {
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    description:
      "Given an unsorted array of integers, return the length of the longest consecutive elements sequence.",
    concepts: ["hash set"],
    starterCode: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let length = 1;
      while (set.has(current + 1)) {
        current++;
        length++;
      }
      longest = Math.max(longest, length);
    }
  }
  return longest;
}`,
    visualizationFocus: ["sequenceGrowth"],
    sampleInput: "nums = [100,4,200,1,3,2]",
    sampleOutput: "4",
  },
  {
    slug: "decode-ways",
    title: "Decode Ways",
    description:
      "Given a string s containing digits, return the number of ways to decode it using mapping A=1 to Z=26.",
    concepts: ["dynamic programming"],
    starterCode: `function numDecodings(s) {
  if (s[0] === '0') return 0;
  let prev = 1;
  let curr = 1;
  for (let i = 1; i < s.length; i++) {
    let temp = 0;
    if (s[i] !== '0') temp = curr;
    const twoDigit = parseInt(s.slice(i - 1, i + 1), 10);
    if (twoDigit >= 10 && twoDigit <= 26) temp += prev;
    prev = curr;
    curr = temp;
  }
  return curr;
}`,
    visualizationFocus: ["dpProgress"],
    sampleInput: "s = '226'",
    sampleOutput: "3",
  },
  {
    slug: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    description:
      "Given an m x n matrix, if an element is 0, set its entire row and column to 0.",
    concepts: ["matrix"],
    starterCode: `function setZeroes(matrix) {
  const rows = new Set();
  const cols = new Set();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        rows.add(i);
        cols.add(j);
      }
    }
  }
  for (const r of rows) {
    matrix[r] = new Array(matrix[0].length).fill(0);
  }
  for (const c of cols) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][c] = 0;
    }
  }
  return matrix;
}`,
    visualizationFocus: ["zeroPropagations"],
    sampleInput: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
    sampleOutput: "[[1,0,1],[0,0,0],[1,0,1]]",
  },
  {
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    description:
      "Given an m x n matrix, return all elements in spiral order.",
    concepts: ["matrix traversal"],
    starterCode: `function spiralOrder(matrix) {
  const res = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
    visualizationFocus: ["layerTraversal"],
    sampleInput: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
    sampleOutput: "[1,2,3,6,9,8,7,4,5]",
  },
  {
    slug: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    description:
      "Given the root of a binary tree, return the values of the nodes you can see from the right side.",
    concepts: ["bfs"],
    starterCode: `function rightSideView(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (i === size - 1) res.push(node.val);
    }
  }
  return res;
}`,
    visualizationFocus: ["levelTraversal"],
    sampleInput: "root = [1,2,3,null,5,null,4]",
    sampleOutput: "[1,3,4]",
  },
  {
    slug: "lowest-common-ancestor",
    title: "Lowest Common Ancestor of a BST",
    description:
      "Find the lowest common ancestor of two nodes in a binary search tree.",
    concepts: ["bst"],
    starterCode: `function lowestCommonAncestor(root, p, q) {
  let current = root;
  while (current) {
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }
  return null;
}`,
    visualizationFocus: ["pathTraversal"],
    sampleInput: "root = [6,2,8,0,4,7,9,null,null,3,5], p=2, q=8",
    sampleOutput: "6",
  },
  {
    slug: "binary-tree-serialization",
    title: "Serialize and Deserialize Binary Tree",
    description:
      "Design an algorithm to serialize and deserialize a binary tree.",
    concepts: ["bfs", "serialization"],
    starterCode: `function serialize(root) {
  if (!root) return '[]';
  const res = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push(null);
    }
  }
  while (res[res.length - 1] === null) res.pop();
  return JSON.stringify(res);
}

function deserialize(data) {
  const arr = JSON.parse(data);
  if (!arr.length) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    const leftVal = arr[i++];
    const rightVal = arr[i++];
    if (leftVal !== null && leftVal !== undefined) {
      node.left = { val: leftVal, left: null, right: null };
      queue.push(node.left);
    }
    if (rightVal !== null && rightVal !== undefined) {
      node.right = { val: rightVal, left: null, right: null };
      queue.push(node.right);
    }
  }
  return root;
}`,
    visualizationFocus: ["queueState", "serialization"],
    sampleInput: "root = [1,2,3,null,null,4,5]",
    sampleOutput: "Serialized '[1,2,3,null,null,4,5]'",
  },
  {
    slug: "word-ladder",
    title: "Word Ladder",
    description:
      "Given two words, beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord.",
    concepts: ["bfs"],
    starterCode: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  let level = 1;
  let queue = [beginWord];
  while (queue.length) {
    const nextQueue = [];
    for (const word of queue) {
      if (word === endWord) return level;
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {
          const candidate =
            word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (wordSet.has(candidate)) {
            nextQueue.push(candidate);
            wordSet.delete(candidate);
          }
        }
      }
    }
    queue = nextQueue;
    level++;
  }
  return 0;
}`,
    visualizationFocus: ["levelTraversal", "wordExpansion"],
    sampleInput: "beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog']",
    sampleOutput: "5",
  },
  {
    slug: "jump-game",
    title: "Jump Game",
    description:
      "Given an array of non-negative integers nums, determine if you can reach the last index.",
    concepts: ["greedy"],
    starterCode: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    visualizationFocus: ["maxReach"],
    sampleInput: "nums = [2,3,1,1,4]",
    sampleOutput: "true",
  },
  {
    slug: "task-scheduler",
    title: "Task Scheduler",
    description:
      "Given a list of tasks represented by characters and a non-negative integer n, find the least number of intervals needed to finish all tasks.",
    concepts: ["greedy", "counting"],
    starterCode: `function leastInterval(tasks, n) {
  const freq = Array(26).fill(0);
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }
  freq.sort((a, b) => b - a);
  const maxFreq = freq[0] - 1;
  let idleSlots = maxFreq * n;
  for (let i = 1; i < freq.length && idleSlots > 0; i++) {
    idleSlots -= Math.min(freq[i], maxFreq);
  }
  return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;
}`,
    visualizationFocus: ["idleSlots", "frequency"],
    sampleInput: "tasks = ['A','A','A','B','B','B'], n = 2",
    sampleOutput: "8",
  },
  {
    slug: "reorder-list",
    title: "Reorder List",
    description:
      "Given the head of a singly linked list L0→L1→…→Ln-1→Ln, reorder the list to L0→Ln→L1→Ln-1→L2→Ln-2→…",
    concepts: ["linked list"],
    starterCode: `function reorderList(head) {
  if (!head || !head.next) return head;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null;
  let curr = slow.next;
  slow.next = null;
  while (curr) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  let first = head;
  let second = prev;
  while (second) {
    const temp1 = first.next;
    const temp2 = second.next;
    first.next = second;
    second.next = temp1;
    first = temp1;
    second = temp2;
  }
  return head;
}`,
    visualizationFocus: ["pointerMovement", "listMerges"],
    sampleInput: "head = [1,2,3,4]",
    sampleOutput: "[1,4,2,3]",
  },
  {
    slug: "clone-graph",
    title: "Clone Graph",
    description:
      "Clone an undirected graph. Each node contains a value and a list of neighbors.",
    concepts: ["dfs", "graph"],
    starterCode: `function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  const dfs = (n) => {
    if (map.has(n)) return map.get(n);
    const copy = { val: n.val, neighbors: [] };
    map.set(n, copy);
    for (const neighbor of n.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  };
  return dfs(node);
}`,
    visualizationFocus: ["nodeVisits"],
    sampleInput: "node = graph adjacency list [[2,4],[1,3],[2,4],[1,3]]",
    sampleOutput: "Cloned graph",
  },
  {
    slug: "binary-tree-vertical-order",
    title: "Binary Tree Vertical Order Traversal",
    description:
      "Return the vertical order traversal of a binary tree's nodes' values.",
    concepts: ["bfs"],
    starterCode: `function verticalOrder(root) {
  if (!root) return [];
  const map = new Map();
  const queue = [{ node: root, col: 0 }];
  let minCol = 0;
  let maxCol = 0;
  while (queue.length) {
    const { node, col } = queue.shift();
    if (!map.has(col)) map.set(col, []);
    map.get(col).push(node.val);
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);
    if (node.left) queue.push({ node: node.left, col: col - 1 });
    if (node.right) queue.push({ node: node.right, col: col + 1 });
  }
  const res = [];
  for (let i = minCol; i <= maxCol; i++) {
    if (map.has(i)) res.push(map.get(i));
  }
  return res;
}`,
    visualizationFocus: ["columnTracking"],
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "[[9],[3,15],[20],[7]]",
  },
  {
    slug: "binary-tree-paths",
    title: "Binary Tree Paths",
    description:
      "Return all root-to-leaf paths in a binary tree.",
    concepts: ["dfs"],
    starterCode: `function binaryTreePaths(root) {
  if (!root) return [];
  const res = [];
  const dfs = (node, path) => {
    if (!node.left && !node.right) {
      res.push(path + node.val);
      return;
    }
    if (node.left) dfs(node.left, path + node.val + '->');
    if (node.right) dfs(node.right, path + node.val + '->');
  };
  dfs(root, '');
  return res;
}`,
    visualizationFocus: ["pathTracking"],
    sampleInput: "root = [1,2,3,null,5]",
    sampleOutput: "['1->2->5','1->3']",
  },
  {
    slug: "letter-combinations-phone",
    title: "Letter Combinations of a Phone Number",
    description:
      "Given a string containing digits 2-9, return all possible letter combinations that the number could represent.",
    concepts: ["backtracking"],
    starterCode: `function letterCombinations(digits) {
  if (!digits.length) return [];
  const map = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  };
  const res = [];
  const dfs = (index, path) => {
    if (index === digits.length) {
      res.push(path);
      return;
    }
    for (const ch of map[digits[index]]) {
      dfs(index + 1, path + ch);
    }
  };
  dfs(0, '');
  return res;
}`,
    visualizationFocus: ["recursionTree"],
    sampleInput: "digits = '23'",
    sampleOutput: "['ad','ae','af','bd','be','bf','cd','ce','cf']",
  },
  {
    slug: "subsets",
    title: "Subsets",
    description:
      "Return all possible subsets (the power set) of a given integer array.",
    concepts: ["backtracking"],
    starterCode: `function subsets(nums) {
  const res = [];
  const path = [];
  const dfs = (index) => {
    res.push([...path]);
    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
}`,
    visualizationFocus: ["recursionTree"],
    sampleInput: "nums = [1,2,3]",
    sampleOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
  },
  {
    slug: "construct-binary-tree-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    description:
      "Given preorder and inorder traversal of a tree, construct the binary tree.",
    concepts: ["recursion", "tree"],
    starterCode: `function buildTree(preorder, inorder) {
  const indexMap = new Map();
  inorder.forEach((val, idx) => indexMap.set(val, idx));
  let preorderIndex = 0;
  const arrayToTree = (left, right) => {
    if (left > right) return null;
    const rootVal = preorder[preorderIndex++];
    const root = { val: rootVal, left: null, right: null };
    root.left = arrayToTree(left, indexMap.get(rootVal) - 1);
    root.right = arrayToTree(indexMap.get(rootVal) + 1, right);
    return root;
  };
  return arrayToTree(0, inorder.length - 1);
}`,
    visualizationFocus: ["recursionTree", "indexRanges"],
    sampleInput: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
    sampleOutput: "Constructed tree root",
  },
  {
    slug: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    description:
      "Given an array of heights representing histogram bars, find the largest rectangle in the histogram.",
    concepts: ["stack"],
    starterCode: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length && stack[stack.length - 1].height > heights[i]) {
      const { index, height } = stack.pop();
      maxArea = Math.max(maxArea, height * (i - index));
      start = index;
    }
    stack.push({ index: start, height: heights[i] });
  }
  heights.pop();
  return maxArea;
}`,
    visualizationFocus: ["stackState", "areaUpdates"],
    sampleInput: "heights = [2,1,5,6,2,3]",
    sampleOutput: "10",
  },
];

const hardSeeds = [
  {
    slug: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    description:
      "Merge k sorted linked lists and return it as one sorted list.",
    concepts: ["heap"],
    starterCode: `function mergeKLists(lists) {
  const heap = [];
  const push = (node) => {
    if (!node) return;
    heap.push(node);
    heap.sort((a, b) => a.val - b.val);
  };
  lists.forEach(push);
  const dummy = { next: null };
  let tail = dummy;
  while (heap.length) {
    const smallest = heap.shift();
    tail.next = smallest;
    tail = tail.next;
    push(smallest.next);
  }
  return dummy.next;
}`,
    visualizationFocus: ["heapState"],
    sampleInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
    sampleOutput: "[1,1,2,3,4,4,5,6]",
  },
  {
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    description:
      "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    concepts: ["two pointers"],
    starterCode: `function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
    visualizationFocus: ["leftMax", "rightMax", "waterAccumulated"],
    sampleInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    sampleOutput: "6",
  },
  {
    slug: "minimum-window-subsequence",
    title: "Minimum Window Subsequence",
    description:
      "Given strings S and T, return the smallest substring of S such that T is a subsequence of the substring.",
    concepts: ["dynamic programming"],
    starterCode: `function minWindowSubsequence(s, t) {
  let min = '';
  let sIdx = 0;
  while (sIdx < s.length) {
    let tIdx = 0;
    while (sIdx < s.length) {
      if (s[sIdx] === t[tIdx]) tIdx++;
      if (tIdx === t.length) break;
      sIdx++;
    }
    if (sIdx === s.length) break;
    let end = sIdx + 1;
    tIdx = t.length - 1;
    while (sIdx >= 0) {
      if (s[sIdx] === t[tIdx]) tIdx--;
      if (tIdx < 0) break;
      sIdx--;
    }
    const start = sIdx;
    if (!min || end - start < min.length) {
      min = s.slice(start, end);
    }
    sIdx = start + 1;
  }
  return min;
}`,
    visualizationFocus: ["windowSearch"],
    sampleInput: "s = 'abcdebdde', t = 'bde'",
    sampleOutput: "'bcde'",
  },
  {
    slug: "maximal-rectangle",
    title: "Maximal Rectangle",
    description:
      "Given a binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's.",
    concepts: ["stack", "dynamic programming"],
    starterCode: `function maximalRectangle(matrix) {
  if (!matrix.length) return 0;
  const cols = matrix[0].length;
  const heights = Array(cols).fill(0);
  let maxArea = 0;
  for (const row of matrix) {
    for (let c = 0; c < cols; c++) {
      heights[c] = row[c] === '1' ? heights[c] + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea([...heights]));
  }
  return maxArea;
}

function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length && stack[stack.length - 1].height > heights[i]) {
      const { index, height } = stack.pop();
      maxArea = Math.max(maxArea, height * (i - index));
      start = index;
    }
    stack.push({ index: start, height: heights[i] });
  }
  heights.pop();
  return maxArea;
}`,
    visualizationFocus: ["histogramHeights"],
    sampleInput: "matrix = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]",
    sampleOutput: "6",
  },
  {
    slug: "edit-distance",
    title: "Edit Distance",
    description:
      "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.",
    concepts: ["dynamic programming"],
    starterCode: `function minDistance(word1, word2) {
  const dp = Array.from({ length: word1.length + 1 }, () =>
    Array(word2.length + 1).fill(0)
  );
  for (let i = 0; i <= word1.length; i++) dp[i][0] = i;
  for (let j = 0; j <= word2.length; j++) dp[0][j] = j;
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        ) + 1;
      }
    }
  }
  return dp[word1.length][word2.length];
}`,
    visualizationFocus: ["dpMatrix"],
    sampleInput: "word1 = 'horse', word2 = 'ros'",
    sampleOutput: "3",
  },
  {
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    description:
      "Implement regular expression matching with support for '.' and '*'.",
    concepts: ["dynamic programming"],
    starterCode: `function isMatch(s, p) {
  const dp = Array.from({ length: s.length + 1 }, () =>
    Array(p.length + 1).fill(false)
  );
  dp[s.length][p.length] = true;
  for (let i = s.length; i >= 0; i--) {
    for (let j = p.length - 1; j >= 0; j--) {
      const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
      if (j + 1 < p.length && p[j + 1] === '*') {
        dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
      } else {
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
}`,
    visualizationFocus: ["dpMatrix"],
    sampleInput: "s = 'aab', p = 'c*a*b'",
    sampleOutput: "true",
  },
  {
    slug: "word-search-ii",
    title: "Word Search II",
    description:
      "Given a 2D board and a list of words, find all words that can be formed in the board.",
    concepts: ["trie", "dfs"],
    starterCode: `function findWords(board, words) {
  const root = buildTrie(words);
  const res = [];
  const rows = board.length;
  const cols = board[0].length;
  const dfs = (r, c, node, path) => {
    if (node.word) {
      res.push(node.word);
      node.word = null;
    }
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    const ch = board[r][c];
    if (!node.children[ch]) return;
    board[r][c] = '#';
    const nextNode = node.children[ch];
    dfs(r + 1, c, nextNode, path + ch);
    dfs(r - 1, c, nextNode, path + ch);
    dfs(r, c + 1, nextNode, path + ch);
    dfs(r, c - 1, nextNode, path + ch);
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root, '');
    }
  }
  return res;
}

function buildTrie(words) {
  const root = { children: {}, word: null };
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = { children: {}, word: null };
      node = node.children[ch];
    }
    node.word = word;
  }
  return root;
}`,
    visualizationFocus: ["trieTraversal"],
    sampleInput: "board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words=['oath','pea','eat','rain']",
    sampleOutput: "['oath','eat']",
  },
  {
    slug: "alien-dictionary",
    title: "Alien Dictionary",
    description:
      "Given a list of words sorted lexicographically in an alien language, derive the order of the alphabet.",
    concepts: ["graph", "topological sort"],
    starterCode: `function alienOrder(words) {
  const adj = new Map();
  const indegree = new Map();
  for (const word of words) {
    for (const ch of word) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!indegree.has(ch)) indegree.set(ch, 0);
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      const c1 = w1[j];
      const c2 = w2[j];
      if (c1 !== c2) {
        if (!adj.get(c1).has(c2)) {
          adj.get(c1).add(c2);
          indegree.set(c2, indegree.get(c2) + 1);
        }
        break;
      }
    }
  }
  const queue = [];
  for (const [char, deg] of indegree) {
    if (deg === 0) queue.push(char);
  }
  let order = '';
  while (queue.length) {
    const char = queue.shift();
    order += char;
    for (const next of adj.get(char)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  return order.length === indegree.size ? order : '';
}`,
    visualizationFocus: ["graphEdges", "topoOrder"],
    sampleInput: "words = ['wrt','wrf','er','ett','rftt']",
    sampleOutput: "'wertf'",
  },
  {
    slug: "minimum-window-substring-hard",
    title: "Minimum Window Substring II",
    description:
      "Find the smallest substring of s that contains all characters of t with multiplicity, optimized with indexed filtering.",
    concepts: ["sliding window"],
    starterCode: `function minWindowFast(s, t) {
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  const filtered = [];
  for (let i = 0; i < s.length; i++) {
    if (need.has(s[i])) filtered.push([i, s[i]]);
  }
  let left = 0;
  let have = 0;
  const window = new Map();
  let res = [-1, 0, 0];
  let right = 0;
  while (right < filtered.length) {
    const [idx, char] = filtered[right];
    window.set(char, (window.get(char) || 0) + 1);
    if (need.has(char) && window.get(char) === need.get(char)) have++;
    while (left <= right && have === need.size) {
      const start = filtered[left][0];
      const end = filtered[right][0];
      if (res[0] === -1 || end - start + 1 < res[0]) {
        res = [end - start + 1, start, end];
      }
      const leftChar = filtered[left][1];
      window.set(leftChar, window.get(leftChar) - 1);
      if (window.get(leftChar) < need.get(leftChar)) have--;
      left++;
    }
    right++;
  }
  return res[0] === -1 ? '' : s.slice(res[1], res[2] + 1);
}`,
    visualizationFocus: ["filteredWindow"],
    sampleInput: "s = 'ADOBECODEBANC', t = 'ABC'",
    sampleOutput: "'BANC'",
  },
  {
    slug: "longest-valid-parentheses",
    title: "Longest Valid Parentheses",
    description:
      "Given a string containing just '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    concepts: ["stack", "dynamic programming"],
    starterCode: `function longestValidParentheses(s) {
  const stack = [-1];
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }
  return maxLen;
}`,
    visualizationFocus: ["stackState", "maxUpdates"],
    sampleInput: "s = '(()'",
    sampleOutput: "2",
  },
  {
    slug: "largest-rectangle-in-skyline",
    title: "Skyline Maximum Rectangle",
    description:
      "Given skyline key points, compute the largest rectangular area that can fit under the skyline.",
    concepts: ["divide and conquer"],
    starterCode: `function largestRectangleSkyline(heights, start = 0, end = heights.length - 1) {
  if (start > end) return 0;
  let minIndex = start;
  for (let i = start; i <= end; i++) {
    if (heights[i] < heights[minIndex]) {
      minIndex = i;
    }
  }
  const left = largestRectangleSkyline(heights, start, minIndex - 1);
  const right = largestRectangleSkyline(heights, minIndex + 1, end);
  const span = (end - start + 1) * heights[minIndex];
  return Math.max(left, right, span);
}`,
    visualizationFocus: ["divideConquer"],
    sampleInput: "heights = [2,1,5,6,2,3]",
    sampleOutput: "10",
  },
  {
    slug: "palindrome-partitioning-ii",
    title: "Palindrome Partitioning II",
    description:
      "Given a string s, partition it such that every substring is a palindrome. Return the minimum cuts needed.",
    concepts: ["dynamic programming"],
    starterCode: `function minCut(s) {
  const n = s.length;
  const isPal = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
        isPal[i][j] = true;
      }
    }
  }
  const dp = Array(n).fill(Infinity);
  for (let i = 0; i < n; i++) {
    if (isPal[0][i]) {
      dp[i] = 0;
      continue;
    }
    for (let j = 0; j < i; j++) {
      if (isPal[j + 1][i]) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }
  return dp[n - 1];
}`,
    visualizationFocus: ["dpMatrix", "cutUpdates"],
    sampleInput: "s = 'aab'",
    sampleOutput: "1",
  },
  {
    slug: "shortest-palindrome",
    title: "Shortest Palindrome",
    description:
      "Given a string s, you can add characters in front of it to make it a palindrome. Find and return the shortest palindrome.",
    concepts: ["kmp", "string"],
    starterCode: `function shortestPalindrome(s) {
  const rev = s.split('').reverse().join('');
  const combined = s + '#' + rev;
  const lps = Array(combined.length).fill(0);
  for (let i = 1; i < combined.length; i++) {
    let len = lps[i - 1];
    while (len > 0 && combined[i] !== combined[len]) {
      len = lps[len - 1];
    }
    if (combined[i] === combined[len]) len++;
    lps[i] = len;
  }
  return rev.slice(0, s.length - lps[combined.length - 1]) + s;
}`,
    visualizationFocus: ["lpsArray"],
    sampleInput: "s = 'aacecaaa'",
    sampleOutput: "'aaacecaaa'",
  },
  {
    slug: "wildcard-matching",
    title: "Wildcard Matching",
    description:
      "Implement wildcard pattern matching supporting '?' and '*'.",
    concepts: ["dynamic programming"],
    starterCode: `function isWildcardMatch(s, p) {
  const dp = Array.from({ length: s.length + 1 }, () =>
    Array(p.length + 1).fill(false)
  );
  dp[0][0] = true;
  for (let j = 1; j <= p.length; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];
  }
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      }
    }
  }
  return dp[s.length][p.length];
}`,
    visualizationFocus: ["dpMatrix"],
    sampleInput: "s = 'adceb', p = '*a*b'",
    sampleOutput: "true",
  },
  {
    slug: "N-queens",
    title: "N-Queens",
    description:
      "Place n queens on an n×n chessboard so that no two queens attack each other.",
    concepts: ["backtracking"],
    starterCode: `function solveNQueens(n) {
  const res = [];
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  const board = Array.from({ length: n }, () => '.'.repeat(n));
  const place = (row) => {
    if (row === n) {
      res.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      board[row] = board[row].substring(0, col) + 'Q' + board[row].substring(col + 1);
      place(row + 1);
      board[row] = board[row].substring(0, col) + '.' + board[row].substring(col + 1);
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };
  place(0);
  return res;
}`,
    visualizationFocus: ["boardStates"],
    sampleInput: "n = 4",
    sampleOutput: "Two valid board configurations",
  },
  {
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays in O(log (m+n)).",
    concepts: ["binary search"],
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const x = nums1.length;
  const y = nums2.length;
  let low = 0;
  let high = x;
  while (low <= high) {
    const partitionX = Math.floor((low + high) / 2);
    const partitionY = Math.floor((x + y + 1) / 2) - partitionX;
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === x ? Infinity : nums1[partitionX];
    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === y ? Infinity : nums2[partitionY];
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((x + y) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  return 0;
}`,
    visualizationFocus: ["partitionBounds"],
    sampleInput: "nums1 = [1,3], nums2 = [2]",
    sampleOutput: "2",
  },
  {
    slug: "longest-increasing-path-matrix",
    title: "Longest Increasing Path in a Matrix",
    description:
      "Given an m x n integers matrix, return the length of the longest increasing path.",
    concepts: ["dfs", "memoization"],
    starterCode: `function longestIncreasingPath(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const memo = Array.from({ length: rows }, () => Array(cols).fill(0));
  const dfs = (r, c) => {
    if (memo[r][c]) return memo[r][c];
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let maxLen = 1;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        matrix[nr][nc] > matrix[r][c]
      ) {
        maxLen = Math.max(maxLen, 1 + dfs(nr, nc));
      }
    }
    memo[r][c] = maxLen;
    return maxLen;
  };
  let res = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      res = Math.max(res, dfs(r, c));
    }
  }
  return res;
}`,
    visualizationFocus: ["dfsPaths"],
    sampleInput: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
    sampleOutput: "4",
  },
  {
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    description:
      "Given a binary tree, find the maximum path sum.",
    concepts: ["dfs"],
    starterCode: `function maxPathSum(root) {
  let maxSum = -Infinity;
  const dfs = (node) => {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  };
  dfs(root);
  return maxSum;
}`,
    visualizationFocus: ["pathSums"],
    sampleInput: "root = [-10,9,20,null,null,15,7]",
    sampleOutput: "42",
  },
  {
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    description:
      "Given an array nums and a sliding window of size k, return the maximum in each window.",
    concepts: ["deque"],
    starterCode: `function maxSlidingWindow(nums, k) {
  const deque = [];
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`,
    visualizationFocus: ["dequeState"],
    sampleInput: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
    sampleOutput: "[3,3,5,5,6,7]",
  },
  {
    slug: "substring-with-concatenation",
    title: "Substring with Concatenation of All Words",
    description:
      "Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once.",
    concepts: ["sliding window", "hash map"],
    starterCode: `function findSubstring(s, words) {
  if (!words.length) return [];
  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;
  const wordCount = new Map();
  for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  }
  const res = [];
  for (let i = 0; i < wordLen; i++) {
    let left = i;
    let count = 0;
    const seen = new Map();
    for (let right = i; right <= s.length - wordLen; right += wordLen) {
      const word = s.slice(right, right + wordLen);
      if (wordCount.has(word)) {
        seen.set(word, (seen.get(word) || 0) + 1);
        count++;
        while (seen.get(word) > wordCount.get(word)) {
          const leftWord = s.slice(left, left + wordLen);
          seen.set(leftWord, seen.get(leftWord) - 1);
          left += wordLen;
          count--;
        }
        if (count === words.length) {
          res.push(left);
          const leftWord = s.slice(left, left + wordLen);
          seen.set(leftWord, seen.get(leftWord) - 1);
          left += wordLen;
          count--;
        }
      } else {
        seen.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }
  return res;
}`,
    visualizationFocus: ["windowUpdates"],
    sampleInput: "s = 'barfoothefoobarman', words = ['foo','bar']",
    sampleOutput: "[0,9]",
  },
  {
    slug: "strobogrammatic-number-iii",
    title: "Strobogrammatic Number III",
    description:
      "Given two integers low and high represented as strings, return the count of strobogrammatic numbers in the range.",
    concepts: ["recursion"],
    starterCode: `function strobogrammaticInRange(low, high) {
  let count = 0;
  for (let len = low.length; len <= high.length; len++) {
    const nums = build(len, len);
    for (const num of nums) {
      if (
        (num.length === low.length && num < low) ||
        (num.length === high.length && num > high)
      ) {
        continue;
      }
      if (!(num.length > 1 && num[0] === '0')) count++;
    }
  }
  return count;
}

function build(currLen, totalLen) {
  if (currLen === 0) return [''];
  if (currLen === 1) return ['0', '1', '8'];
  const middles = build(currLen - 2, totalLen);
  const pairs = [
    ['0', '0'],
    ['1', '1'],
    ['6', '9'],
    ['8', '8'],
    ['9', '6'],
  ];
  const result = [];
  for (const middle of middles) {
    for (const [a, b] of pairs) {
      if (currLen === totalLen && a === '0') continue;
      result.push(a + middle + b);
    }
  }
  return result;
}`,
    visualizationFocus: ["recursionTree"],
    sampleInput: "low = '50', high = '100'",
    sampleOutput: "3",
  },
  {
    slug: "critical-connections-network",
    title: "Critical Connections in a Network",
    description:
      "Find all critical connections (bridges) in an undirected graph.",
    concepts: ["tarjan", "dfs"],
    starterCode: `function criticalConnections(n, connections) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const ids = Array(n).fill(-1);
  const low = Array(n).fill(0);
  const res = [];
  let id = 0;
  const dfs = (at, parent) => {
    ids[at] = low[at] = id++;
    for (const to of graph[at]) {
      if (to === parent) continue;
      if (ids[to] === -1) {
        dfs(to, at);
        low[at] = Math.min(low[at], low[to]);
        if (ids[at] < low[to]) res.push([at, to]);
      } else {
        low[at] = Math.min(low[at], ids[to]);
      }
    }
  };
  dfs(0, -1);
  return res;
}`,
    visualizationFocus: ["dfsOrder", "lowLinks"],
    sampleInput: "n=4, connections=[[0,1],[1,2],[2,0],[1,3]]",
    sampleOutput: "[[1,3]]",
  },
  {
    slug: "maximum-profit-in-job-scheduling",
    title: "Maximum Profit in Job Scheduling",
    description:
      "Given job start times, end times, and profits, find the maximum profit subset of non-overlapping jobs.",
    concepts: ["dp", "binary search"],
    starterCode: `function jobScheduling(startTime, endTime, profit) {
  const jobs = startTime.map((s, i) => ({
    start: s,
    end: endTime[i],
    profit: profit[i],
  }));
  jobs.sort((a, b) => a.end - b.end);
  const n = jobs.length;
  const dp = Array(n).fill(0);
  dp[0] = jobs[0].profit;
  const binarySearch = (index) => {
    let low = 0;
    let high = index - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (jobs[mid].end <= jobs[index].start) {
        if (jobs[mid + 1] && jobs[mid + 1].end <= jobs[index].start) {
          low = mid + 1;
        } else {
          return mid;
        }
      } else {
        high = mid - 1;
      }
    }
    return -1;
  };
  for (let i = 1; i < n; i++) {
    let includeProfit = jobs[i].profit;
    const prev = binarySearch(i);
    if (prev !== -1) includeProfit += dp[prev];
    dp[i] = Math.max(includeProfit, dp[i - 1]);
  }
  return dp[n - 1];
}`,
    visualizationFocus: ["dpArray", "binarySearch"],
    sampleInput: "start=[1,2,3,4,6], end=[3,5,10,6,9], profit=[20,20,100,70,60]",
    sampleOutput: "150",
  },
  {
    slug: "max-sum-rectangle-no-larger-than-k",
    title: "Max Sum Rectangle No Larger Than K",
    description:
      "Given a matrix and an integer k, find the max sum of a rectangle no larger than k.",
    concepts: ["prefix sum", "binary search"],
    starterCode: `function maxSumSubmatrix(matrix, k) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxSum = -Infinity;
  for (let left = 0; left < cols; left++) {
    const sums = Array(rows).fill(0);
    for (let right = left; right < cols; right++) {
      for (let r = 0; r < rows; r++) {
        sums[r] += matrix[r][right];
      }
      maxSum = Math.max(maxSum, maxSubArrayNoMoreThanK(sums, k));
      if (maxSum === k) return k;
    }
  }
  return maxSum;
}

function maxSubArrayNoMoreThanK(arr, k) {
  let maxSum = -Infinity;
  let prefix = 0;
  const prefixSums = [0];
  for (const num of arr) {
    prefix += num;
    let left = 0;
    let right = prefixSums.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (prefix - prefixSums[mid] <= k) {
        maxSum = Math.max(maxSum, prefix - prefixSums[mid]);
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    prefixSums.splice(left, 0, prefix);
  }
  return maxSum;
}`,
    visualizationFocus: ["prefixSums"],
    sampleInput: "matrix=[[1,0,1],[0,-2,3]], k=2",
    sampleOutput: "2",
  },
  {
    slug: "largest-component-size-common-factor",
    title: "Largest Component Size by Common Factor",
    description:
      "Find the size of the largest connected component in an array where edges connect numbers sharing a common factor > 1.",
    concepts: ["union find", "number theory"],
    starterCode: `function largestComponentSize(nums) {
  const maxNum = Math.max(...nums);
  const parent = Array(maxNum + 1)
    .fill(0)
    .map((_, i) => i);
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent[rootA] = rootB;
  };
  const sieve = Array(maxNum + 1).fill(0);
  for (let i = 2; i <= maxNum; i++) {
    if (sieve[i] === 0) {
      for (let j = i; j <= maxNum; j += i) {
        if (sieve[j] === 0) sieve[j] = i;
        union(i, j);
      }
    }
  }
  const count = new Map();
  let maxSize = 0;
  for (const num of nums) {
    const root = find(num);
    count.set(root, (count.get(root) || 0) + 1);
    maxSize = Math.max(maxSize, count.get(root));
  }
  return maxSize;
}`,
    visualizationFocus: ["unionOperations"],
    sampleInput: "nums = [4,6,15,35]",
    sampleOutput: "4",
  },
  {
    slug: "text-justification",
    title: "Text Justification",
    description:
      "Given an array of words and a max width, format the text so that each line has exactly maxWidth characters and is fully justified.",
    concepts: ["greedy"],
    starterCode: `function fullJustify(words, maxWidth) {
  const res = [];
  let index = 0;
  while (index < words.length) {
    let totalChars = words[index].length;
    let last = index + 1;
    while (
      last < words.length &&
      totalChars + 1 + words[last].length <= maxWidth
    ) {
      totalChars += 1 + words[last].length;
      last++;
    }
    const gaps = last - index - 1;
    let line = '';
    if (last === words.length || gaps === 0) {
      for (let i = index; i < last; i++) {
        line += words[i] + ' ';
      }
      line = line.trim();
      while (line.length < maxWidth) line += ' ';
    } else {
      const spaces = Math.floor((maxWidth - totalChars) / gaps);
      const extra = (maxWidth - totalChars) % gaps;
      for (let i = index; i < last - 1; i++) {
        line += words[i];
        line += ' '.repeat(spaces + (i - index < extra ? 1 : 0) + 1);
      }
      line += words[last - 1];
    }
    res.push(line);
    index = last;
  }
  return res;
}`,
    visualizationFocus: ["spaceDistribution"],
    sampleInput: "words = ['This','is','an','example','of','text','justification.'], maxWidth = 16",
    sampleOutput: "Formatted lines",
  },
  {
    slug: "word-ladder-ii",
    title: "Word Ladder II",
    description:
      "Return all shortest transformation sequences from beginWord to endWord.",
    concepts: ["bfs", "backtracking"],
    starterCode: `function findLadders(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return [];
  const layer = new Map();
  layer.set(beginWord, [[beginWord]]);
  while (layer.size) {
    const nextLayer = new Map();
    for (const [word, paths] of layer) {
      if (word === endWord) return paths;
      wordSet.delete(word);
    }
    for (const [word, paths] of layer) {
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {
          const candidate =
            word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (!wordSet.has(candidate)) continue;
          const newPaths = paths.map((p) => [...p, candidate]);
          if (!nextLayer.has(candidate)) nextLayer.set(candidate, newPaths);
          else nextLayer.set(candidate, nextLayer.get(candidate).concat(newPaths));
        }
      }
    }
    layer.clear();
    for (const [key, value] of nextLayer) {
      layer.set(key, value);
    }
  }
  return [];
}`,
    visualizationFocus: ["layerExpansion"],
    sampleInput: "beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog']",
    sampleOutput: "[['hit','hot','dot','dog','cog'],['hit','hot','lot','log','cog']]",
  },
  {
    slug: "distinct-subsequences",
    title: "Distinct Subsequences",
    description:
      "Given strings s and t, return the number of distinct subsequences of s which equals t.",
    concepts: ["dynamic programming"],
    starterCode: `function numDistinct(s, t) {
  const dp = Array.from({ length: s.length + 1 }, () =>
    Array(t.length + 1).fill(0)
  );
  for (let i = 0; i <= s.length; i++) dp[i][0] = 1;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[s.length][t.length];
}`,
    visualizationFocus: ["dpMatrix"],
    sampleInput: "s = 'rabbbit', t = 'rabbit'",
    sampleOutput: "3",
  },
  {
    slug: "shortest-bridge",
    title: "Shortest Bridge",
    description:
      "In a binary grid, return the minimum number of 0s that must be flipped to connect two islands.",
    concepts: ["dfs", "bfs"],
    starterCode: `function shortestBridge(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];
  let found = false;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return;
    grid[r][c] = 2;
    queue.push([r, c]);
    for (const [dr, dc] of dirs) dfs(r + dr, c + dc);
  };
  for (let r = 0; r < rows && !found; r++) {
    for (let c = 0; c < cols && !found; c++) {
      if (grid[r][c] === 1) {
        dfs(r, c);
        found = true;
      }
    }
  }
  let steps = 0;
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        if (grid[nr][nc] === 1) return steps;
        if (grid[nr][nc] === 0) {
          grid[nr][nc] = 2;
          queue.push([nr, nc]);
        }
      }
    }
    steps++;
  }
  return steps;
}`,
    visualizationFocus: ["bfsLayers"],
    sampleInput: "grid = [[0,1],[1,0]]",
    sampleOutput: "1",
  },
  {
    slug: "minimum-number-of-refueling-stops",
    title: "Minimum Number of Refueling Stops",
    description:
      "Return the minimum number of refueling stops to reach a target distance.",
    concepts: ["greedy", "heap"],
    starterCode: `function minRefuelStops(target, startFuel, stations) {
  const maxHeap = [];
  let fuel = startFuel;
  let stops = 0;
  let i = 0;
  while (fuel < target) {
    while (i < stations.length && stations[i][0] <= fuel) {
      maxHeap.push(stations[i][1]);
      maxHeap.sort((a, b) => b - a);
      i++;
    }
    if (!maxHeap.length) return -1;
    fuel += maxHeap.shift();
    stops++;
  }
  return stops;
}`,
    visualizationFocus: ["fuelLevels", "heapState"],
    sampleInput: "target=100, startFuel=10, stations=[[10,60],[20,30],[30,30],[60,40]]",
    sampleOutput: "2",
  },
  {
    slug: "robot-room-cleaner",
    title: "Robot Room Cleaner",
    description:
      "Given a robot cleaner with API, clean all accessible cells in an unknown room layout.",
    concepts: ["backtracking"],
    starterCode: `function cleanRoom(robot) {
  const visited = new Set();
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const backtrack = (row, col, dir) => {
    visited.add(\`\${row},\${col}\`);
    robot.clean();
    for (let i = 0; i < 4; i++) {
      const newDir = (dir + i) % 4;
      const [dr, dc] = directions[newDir];
      const newRow = row + dr;
      const newCol = col + dc;
      if (!visited.has(\`\${newRow},\${newCol}\`) && robot.move()) {
        backtrack(newRow, newCol, newDir);
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
      }
      robot.turnRight();
    }
  };
  backtrack(0, 0, 0);
}`,
    visualizationFocus: ["visitedCells", "directionChanges"],
    sampleInput: "Implicit robot API scenario",
    sampleOutput: "Room cleaned",
  },
  {
    slug: "serialize-and-deserialize-n-ary-tree",
    title: "Serialize and Deserialize N-ary Tree",
    description:
      "Design an algorithm to serialize and deserialize an N-ary tree.",
    concepts: ["dfs"],
    starterCode: `function serialize(root) {
  const res = [];
  const dfs = (node) => {
    if (!node) {
      res.push('#');
      return;
    }
    res.push(String(node.val));
    res.push(String(node.children.length));
    for (const child of node.children) {
      dfs(child);
    }
  };
  dfs(root);
  return res.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let index = 0;
  const dfs = () => {
    if (values[index] === '#') {
      index++;
      return null;
    }
    const val = parseInt(values[index++], 10);
    const size = parseInt(values[index++], 10);
    const node = { val, children: [] };
    for (let i = 0; i < size; i++) {
      node.children.push(dfs());
    }
    return node;
  };
  return dfs();
}`,
    visualizationFocus: ["serialization"],
    sampleInput: "root = N-ary tree nodes",
    sampleOutput: "Serialized string",
  },
  {
    slug: "maximum-gap",
    title: "Maximum Gap",
    description:
      "Given an unsorted array, find the maximum difference between successive elements in its sorted form in linear time.",
    concepts: ["bucket sort"],
    starterCode: `function maximumGap(nums) {
  if (nums.length < 2) return 0;
  const minVal = Math.min(...nums);
  const maxVal = Math.max(...nums);
  if (minVal === maxVal) return 0;
  const n = nums.length;
  const bucketSize = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => ({
    used: false,
    min: Infinity,
    max: -Infinity,
  }));
  for (const num of nums) {
    const idx = Math.floor((num - minVal) / bucketSize);
    buckets[idx].used = true;
    buckets[idx].min = Math.min(buckets[idx].min, num);
    buckets[idx].max = Math.max(buckets[idx].max, num);
  }
  let best = 0;
  let prev = minVal;
  for (const bucket of buckets) {
    if (!bucket.used) continue;
    best = Math.max(best, bucket.min - prev);
    prev = bucket.max;
  }
  return best;
}`,
    visualizationFocus: ["bucketRanges"],
    sampleInput: "nums = [3,6,9,1]",
    sampleOutput: "3",
  },
];

const buildProblems = (difficulty, seeds) =>
  seeds.map((details, index) => makeProblem(difficulty, index, details));

export const problemsByDifficulty = {
  easy: buildProblems("easy", easySeeds),
  medium: buildProblems("medium", mediumSeeds),
  hard: buildProblems("hard", hardSeeds),
};

export const allProblems = [
  ...problemsByDifficulty.easy,
  ...problemsByDifficulty.medium,
  ...problemsByDifficulty.hard,
];

export const getProblems = (difficulty) => {
  if (!difficulty) return allProblems;
  const normalized = difficulty.toLowerCase();
  return problemsByDifficulty[normalized] || [];
};

export const getRandomProblem = (difficulty) => {
  const list = getProblems(difficulty);
  if (!list.length) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};


