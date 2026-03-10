export const problemSet = [
    //   {
    //     id: 30,
    //     name: "Two Guys One Girl",
    //     description:
    //       "You shall be given an array of n elements. The array shall be an array of integers and there shall not be any duplicates. You shall also be given an integer k. You have to find out whether it is possible to find two elements in the array whose sum is exactly equal to k.",
    //     difficulty: "Easy",
    //     displayTestCases: [
    //       {
    //         input: {
    //           n: 8,
    //           array: "1 2 3 4 5 6 7 8",
    //           k: 10,
    //         },
    //         outputReal: "true",
    //       },
    //       {
    //         input: {
    //           n: 5,
    //           array: "32 34 81 23 13",
    //           k: 12,
    //         },
    //         outputReal: "false",
    //       },
    //     ],
    //     realTestCases: [
    //       {
    //         input: `8 1 2 3 4 5 6 7 8 10`,
    //         output: "true",
    //       },
    //       {
    //         input: `5 32 34 81 23 13 12`,
    //         output: "false",
    //       },
    //     ],
    //     hiddenTestCases: [
    //       {
    //         input: `16 300 1020 281 9196 123930 1872 2343 11228 4329 2985 19283 12884 2938 1921 3838 2183 322334`,
    //         outputReal: "true",
    //       },
    //     ],
    //     inputFormat:
    //       "The first number of the input contains a single integer n. The next n space numbers represents the array of n integers. The last integer represents the value of k.",
    //     outputFormat: "The output shall be a single boolean value",
    //     constraintsTime: "0 < n < 10^7, 0 < n < 10^7",
    //     constraintsSpace: "O(n)",
    //   },
    {
        id: 1,
        name: "Café Coin Split",
        description: "You’re at a café with a friend. You have a bill to split, but your friend insists on paying only if you two can exactly combine two of your coin denominations to match the bill. Given an array of distinct coin values and the bill amount, determine whether two different coins sum exactly to the bill.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 6,
                    coins: "1 4 5 11 9 6",
                    bill: 10,
                },
                outputReal: "true",
            },
            {
                input: {
                    n: 5,
                    coins: "2 3 7 8 15",
                    bill: 20,
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "6 1 4 5 11 9 6 10",
                output: "true",
            },
            {
                input: "5 2 3 7 8 15 20",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "10 21 34 56 78 90 1 2 3 4 5 35",
                outputReal: "true",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search'],
        inputFormat: "The first line contains integer n. The next n integers are the coin values. The last integer is the value of the bill.",
        outputFormat: "A single boolean value: true or false",
        constraintsTime: "1 <= n <= 10^6",
        constraintsSpace: "O(n)",
    },
    {
        id: 2,
        name: "Stock Watcher",
        description: "You’ve been hired by a fintech startup. Your job is to write a tool that predicts whether buying and selling stock once during the day could result in a profit. You’re given an array of prices, where each element is the price at a specific hour. Return the maximum profit you can make, or 0 if no profit is possible.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 6,
                    prices: "7 1 5 3 6 4",
                },
                outputReal: "5",
            },
            {
                input: {
                    n: 5,
                    prices: "7 6 4 3 1",
                },
                outputReal: "0",
            },
        ],
        realTestCases: [
            {
                input: "6 7 1 5 3 6 4",
                output: "5",
            },
            {
                input: "5 7 6 4 3 1",
                output: "0",
            },
        ],
        hiddenTestCases: [
            {
                input: "10 10 20 5 8 11 2 18 3 1 4",
                outputReal: "16",
            },
        ],
        topics: ['arrays', 'dynamic programming', 'string', 'binary search'],
        inputFormat: "The first line contains integer n. The next n integers represent the stock prices throughout the day.",
        outputFormat: "A single integer representing the maximum profit.",
        constraintsTime: "1 <= n <= 10^5",
        constraintsSpace: "O(1)",
    },
    {
        id: 3,
        name: "Duplicate Detector Bot",
        description: "You’re building a content moderation system for a social app. You need to quickly flag if a list of user IDs contains any duplicate entries. Given an array of user IDs, return true if any ID appears more than once, otherwise return false.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 4,
                    userIDs: "10 22 14 10",
                },
                outputReal: "true",
            },
            {
                input: {
                    n: 5,
                    userIDs: "1 2 3 4 5",
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "4 10 22 14 10",
                output: "true",
            },
            {
                input: "5 1 2 3 4 5",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "6 999 123 1000 123 501 300",
                outputReal: "true",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "The first line contains integer n. The next n integers represent user IDs.",
        outputFormat: "A single boolean value: true or false",
        constraintsTime: "1 <= n <= 10^6",
        constraintsSpace: "O(n)",
    },
    {
        id: 4,
        name: "Zero-Free Multiply",
        description: "In a company’s internal API, you’re asked to return the productivity scores of employees excluding each individual. Given an array of integers, return a new array such that each element at index i is the product of all the elements of the array except the one at i. You must do this without using division.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 4,
                    scores: "1 2 3 4",
                },
                outputReal: "24 12 8 6",
            },
            {
                input: {
                    n: 3,
                    scores: "5 0 2",
                },
                outputReal: "0 10 0",
            },
        ],
        realTestCases: [
            {
                input: "4 1 2 3 4",
                output: "24 12 8 6",
            },
            {
                input: "3 5 0 2",
                output: "0 10 0",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 2 3 0 4 5",
                outputReal: "0 0 120 0 0",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "The first line contains integer n. The next n integers represent productivity scores.",
        outputFormat: "A space-separated list of n integers.",
        constraintsTime: "1 <= n <= 10^5",
        constraintsSpace: "O(n)",
    },
    {
        id: 5,
        name: "Mood Swings",
        description: "A mood-tracking wearable records a person’s energy level every hour. You need to find the longest stretch of hours where the energy levels kept increasing or stayed flat. Given an array of integers, find the length of the longest contiguous subarray with a positive or zero net change in values.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 9,
                    levels: "5 6 7 1 2 3 4 0 1",
                },
                outputReal: "4",
            },
            {
                input: {
                    n: 5,
                    levels: "9 8 7 6 5",
                },
                outputReal: "1",
            },
        ],
        realTestCases: [
            {
                input: "9 5 6 7 1 2 3 4 0 1",
                output: "4",
            },
            {
                input: "5 9 8 7 6 5",
                output: "1",
            },
        ],
        hiddenTestCases: [
            {
                input: "12 1 2 2 3 3 3 4 5 6 0 0 1",
                outputReal: "9",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "The first line contains integer n. The next n integers represent hourly mood energy levels.",
        outputFormat: "A single integer: length of the longest non-decreasing subarray.",
        constraintsTime: "1 <= n <= 10^5",
        constraintsSpace: "O(1)",
    },
    {
        id: 6,
        name: "Merge Meeting Rooms",
        description: "You're working in the HR Tech team of a productivity startup. Each employee can book meeting rooms for certain time intervals. You must detect overlapping meeting schedules and merge them so that overlapping bookings are condensed into one. Given a list of intervals with start and end times, return the merged non-overlapping intervals.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 4,
                    intervals: "1 3 2 6 8 10 15 18",
                },
                outputReal: "1 6 8 10 15 18",
            },
            {
                input: {
                    n: 2,
                    intervals: "1 4 4 5",
                },
                outputReal: "1 5",
            },
        ],
        realTestCases: [
            {
                input: "4 1 3 2 6 8 10 15 18",
                output: "1 6 8 10 15 18",
            },
            {
                input: "2 1 4 4 5",
                output: "1 5",
            },
        ],
        hiddenTestCases: [
            {
                input: "3 1 10 2 3 9 11",
                outputReal: "1 11",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains n (number of intervals). Then n pairs of integers, each representing start and end of an interval.",
        outputFormat: "Merged list of intervals, each represented by start and end in space-separated form.",
        constraintsTime: "1 <= n <= 10^4",
        constraintsSpace: "O(n)",
    },
    {
        id: 7,
        name: "Sequence Streak",
        description: "You’ve joined a company building an AI habit tracker. Your job is to detect the longest streak of consecutive days a user was active. Given an unsorted array of active day numbers, return the length of the longest streak of consecutive integers.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 6,
                    days: "100 4 200 1 3 2",
                },
                outputReal: "4",
            },
            {
                input: {
                    n: 7,
                    days: "9 1 3 10 2 4 20",
                },
                outputReal: "4",
            },
        ],
        realTestCases: [
            {
                input: "6 100 4 200 1 3 2",
                output: "4",
            },
            {
                input: "7 9 1 3 10 2 4 20",
                output: "4",
            },
        ],
        hiddenTestCases: [
            {
                input: "8 500 502 503 504 1 2 3 4",
                outputReal: "4",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains n (number of days). Then n integers denoting active days (unordered).",
        outputFormat: "An integer representing the longest consecutive active streak.",
        constraintsTime: "1 <= n <= 10^5",
        constraintsSpace: "O(n)",
    },
    {
        id: 8,
        name: "Keyword Collisions",
        description: "You're building a search engine and need to detect whether two strings are anagrams of each other. Anagrams are words that use the same characters in the same count but in any order. Given two lowercase strings, determine if one is an anagram of the other.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    s1: "listen",
                    s2: "silent",
                },
                outputReal: "true",
            },
            {
                input: {
                    s1: "hello",
                    s2: "world",
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "listen silent",
                output: "true",
            },
            {
                input: "hello world",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "cinema iceman",
                outputReal: "true",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "Two space-separated lowercase strings.",
        outputFormat: "Boolean value: true if the strings are anagrams, else false.",
        constraintsTime: "1 <= length of each string <= 10^5",
        constraintsSpace: "O(1)",
    },
    {
        id: 9,
        name: "Anagram Bins",
        description: "You’re building a spell checker feature that needs to group similar misspelled words together. Two words are considered similar if they are anagrams of each other. Given a list of lowercase words, group them into clusters of anagrams and print the number of unique clusters.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 6,
                    words: "eat tea tan ate nat bat",
                },
                outputReal: "3",
            },
            {
                input: {
                    n: 3,
                    words: "aab aba baa",
                },
                outputReal: "1",
            },
        ],
        realTestCases: [
            {
                input: "6 eat tea tan ate nat bat",
                output: "3",
            },
            {
                input: "3 aab aba baa",
                output: "1",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 abc bca cab xyz zyx",
                outputReal: "2",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains n. Then n space-separated lowercase words.",
        outputFormat: "A single integer: the number of anagram clusters.",
        constraintsTime: "1 <= n <= 10^4",
        constraintsSpace: "O(n)",
    },
    {
        id: 10,
        name: "No Repeat Retreat",
        description: "You're developing an input system that flags repeated characters. You want to calculate the length of the longest substring in a given string that contains only unique characters. Given a string, return the maximum length of a substring without repeating characters.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    s: "abcabcbb",
                },
                outputReal: "3",
            },
            {
                input: {
                    s: "bbbbb",
                },
                outputReal: "1",
            },
        ],
        realTestCases: [
            {
                input: "abcabcbb",
                output: "3",
            },
            {
                input: "bbbbb",
                output: "1",
            },
        ],
        hiddenTestCases: [
            {
                input: "pwwkew",
                outputReal: "3",
            },
            {
                input: "abcdefghdijklmneopqrg",
                outputReal: "15"
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A single lowercase string.",
        outputFormat: "A single integer: length of the longest substring with no repeating characters.",
        constraintsTime: "1 <= s.length <= 10^5",
        constraintsSpace: "O(n)",
    },
    {
        id: 11,
        name: "Scanner Palindrome",
        description: "A smart book scanner app wants to check if scanned pages contain palindromic text. You're given a string that may include letters, digits, and symbols. Determine if it forms a palindrome after removing all non-alphanumeric characters and ignoring cases.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    s: "A man, a plan, a canal: Panama",
                },
                outputReal: "true",
            },
            {
                input: {
                    s: "race a car",
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "A man, a plan, a canal: Panama",
                output: "true",
            },
            {
                input: "race a car",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "No lemon, no melon",
                outputReal: "true",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A single line string s containing letters, digits, spaces, or symbols.",
        outputFormat: "A boolean value: true if palindrome after cleanup, false otherwise.",
        constraintsTime: "1 <= s.length <= 10^5",
        constraintsSpace: "O(n)",
    },
    {
        id: 12,
        name: "Mirror Heartbeat",
        description: "Your startup is working on wearable tech that records heartbeat patterns. To detect anomalies, you need to find the longest palindromic pattern in the recorded sequence. Given a string representing the sequence, return the longest palindromic substring within it.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    s: "babad",
                },
                outputReal: "bab",
            },
            {
                input: {
                    s: "cbbd",
                },
                outputReal: "bb",
            },
        ],
        realTestCases: [
            {
                input: "babad",
                output: "bab",
            },
            {
                input: "cbbd",
                output: "bb",
            },
        ],
        hiddenTestCases: [
            {
                input: "abacdfgdcaba",
                outputReal: "aba",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A single lowercase string s.",
        outputFormat: "A single string: the longest palindromic substring.",
        constraintsTime: "1 <= s.length <= 1000",
        constraintsSpace: "O(1) or O(n^2)",
    },
    {
        id: 13,
        name: "Deep Leaf Counter",
        description: "You're designing a tree visualizer tool that helps users identify how 'deep' a binary tree grows. You must return the maximum depth of a binary tree. Depth is defined as the number of nodes along the longest path from the root to a leaf.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    tree: "3 9 20 null null 15 7",
                },
                outputReal: "3",
            },
            {
                input: {
                    tree: "1 null 2",
                },
                outputReal: "2",
            },
        ],
        realTestCases: [
            {
                input: "3 9 20 null null 15 7",
                output: "3",
            },
            {
                input: "1 null 2",
                output: "2",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 3 null 2 null 1",
                outputReal: "4",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A space-separated representation of a binary tree in level order with 'null' for empty nodes.",
        outputFormat: "A single integer: the depth of the tree.",
        constraintsTime: "1 <= nodes <= 10^4",
        constraintsSpace: "O(h), where h = height of tree",
    },
    {
        id: 14,
        name: "Binary Mirror",
        description: "In a digital art tool, you need to generate the horizontal mirror of a binary tree image. Write a function that inverts a binary tree—i.e., flips it around its center.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    tree: "4 2 7 1 3 6 9",
                },
                outputReal: "4 7 2 9 6 3 1",
            },
            {
                input: {
                    tree: "2 1 3",
                },
                outputReal: "2 3 1",
            },
        ],
        realTestCases: [
            {
                input: "4 2 7 1 3 6 9",
                output: "4 7 2 9 6 3 1",
            },
            {
                input: "2 1 3",
                output: "2 3 1",
            },
        ],
        hiddenTestCases: [
            {
                input: "1 2 3 null null 4 5",
                outputReal: "1 3 2 5 4",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A space-separated level-order representation of a binary tree, with 'null' for missing nodes.",
        outputFormat: "A space-separated list of the inverted binary tree in level-order.",
        constraintsTime: "1 <= nodes <= 10^4",
        constraintsSpace: "O(h), where h is tree height",
    },
    {
        id: 15,
        name: "Same Family Tree",
        description: "You’re creating a genealogy tool. Two trees represent family hierarchies. You need to determine if they are structurally identical and all corresponding nodes contain the same value.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    tree1: "1 2 3",
                    tree2: "1 2 3",
                },
                outputReal: "true",
            },
            {
                input: {
                    tree1: "1 2",
                    tree2: "1 null 2",
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "1 2 3 | 1 2 3",
                output: "true",
            },
            {
                input: "1 2 | 1 null 2",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 3 7 | 5 3 8",
                outputReal: "false",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "Two space-separated level-order trees separated by '|'. Use 'null' for empty nodes.",
        outputFormat: "Boolean: true if the trees are structurally identical and equal, false otherwise.",
        constraintsTime: "1 <= nodes <= 10^4",
        constraintsSpace: "O(n)",
    },
    {
        id: 16,
        name: "Clone My Subtree",
        description: "You're building a feature to detect duplicate components in a UI tree. You're given two binary trees representing visual layouts. Determine if the second tree is a subtree of the first one. A subtree must match structure and node values.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    tree1: "3 4 5 1 2",
                    tree2: "4 1 2",
                },
                outputReal: "true",
            },
            {
                input: {
                    tree1: "3 4 5 1 2 null null null null 0",
                    tree2: "4 1 2",
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "3 4 5 1 2 | 4 1 2",
                output: "true",
            },
            {
                input: "3 4 5 1 2 null null null null 0 | 4 1 2",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "10 8 12 6 9 null 14 | 8 6 9",
                outputReal: "true",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "Two binary trees given in level order separated by '|'. Use 'null' for empty nodes.",
        outputFormat: "Boolean: true if the second tree is a subtree of the first, false otherwise.",
        constraintsTime: "1 <= nodes <= 10^4",
        constraintsSpace: "O(n)",
    },
    {
        id: 17,
        name: "Ancestry Advisor",
        description: "You are building a family lineage tool. Given a Binary Search Tree (BST) and two nodes, you must find their Lowest Common Ancestor (LCA) — the deepest node that is an ancestor of both given nodes.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    tree: "6 2 8 0 4 7 9 null null 3 5",
                    p: 2,
                    q: 8,
                },
                outputReal: "6",
            },
            {
                input: {
                    tree: "6 2 8 0 4 7 9 null null 3 5",
                    p: 2,
                    q: 4,
                },
                outputReal: "2",
            },
        ],
        realTestCases: [
            {
                input: "6 2 8 0 4 7 9 null null 3 5 | 2 8",
                output: "6",
            },
            {
                input: "6 2 8 0 4 7 9 null null 3 5 | 2 4",
                output: "2",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 3 7 2 4 6 8 | 4 6",
                outputReal: "5",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A BST in level-order followed by two integers p and q separated by '|'.",
        outputFormat: "A single integer representing the value of the LCA node.",
        constraintsTime: "1 <= nodes <= 10^4",
        constraintsSpace: "O(h), where h is tree height",
    },
    {
        id: 18,
        name: "Triad Trouble",
        description: "You’re working in fraud analytics and must identify three suspicious transactions that cancel each other out. Given an array of integers, return all unique triplets (a, b, c) such that a + b + c == 0. The same triplet must not appear multiple times in different orders.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 6,
                    nums: "-1 0 1 2 -1 -4",
                },
                outputReal: "[-1 -1 2] [-1 0 1]",
            },
            {
                input: {
                    n: 3,
                    nums: "0 1 1",
                },
                outputReal: "",
            },
        ],
        realTestCases: [
            {
                input: "6 -1 0 1 2 -1 -4",
                output: "[-1 -1 2] [-1 0 1]",
            },
            {
                input: "3 0 1 1",
                output: "",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 -2 0 2 1 -1",
                outputReal: "[-2 0 2] [-1 0 1]",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains integer n. Then n integers representing array values.",
        outputFormat: "Space-separated list of valid triplets. Each triplet is shown in square brackets, space-separated within.",
        constraintsTime: "3 <= n <= 10^4",
        constraintsSpace: "O(n^2)",
    },
    {
        id: 19,
        name: "Container Logistics",
        description: "You're developing an algorithm to maximize storage between two walls in a container yard. Each wall has a height, and you must pick two walls such that the container between them holds the maximum water. Given an array of heights, return the maximum area of water you can store.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 9,
                    heights: "1 8 6 2 5 4 8 3 7",
                },
                outputReal: "49",
            },
            {
                input: {
                    n: 2,
                    heights: "1 1",
                },
                outputReal: "1",
            },
        ],
        realTestCases: [
            {
                input: "9 1 8 6 2 5 4 8 3 7",
                output: "49",
            },
            {
                input: "2 1 1",
                output: "1",
            },
        ],
        hiddenTestCases: [
            {
                input: "5 2 3 10 5 7",
                outputReal: "35",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains n. Then n space-separated integers representing heights.",
        outputFormat: "A single integer: the maximum area possible between two lines.",
        constraintsTime: "2 <= n <= 10^5",
        constraintsSpace: "O(1)",
    },
    {
        id: 20,
        name: "Lazy Loader",
        description: "A performance team wants to push all inactive modules (value 0) to the end of the load sequence. Given an array of integers where non-zero values represent active modules, shift all zeroes to the end while maintaining the order of active modules.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 5,
                    modules: "0 1 0 3 12",
                },
                outputReal: "1 3 12 0 0",
            },
            {
                input: {
                    n: 4,
                    modules: "0 0 1 2",
                },
                outputReal: "1 2 0 0",
            },
        ],
        realTestCases: [
            {
                input: "5 0 1 0 3 12",
                output: "1 3 12 0 0",
            },
            {
                input: "4 0 0 1 2",
                output: "1 2 0 0",
            },
        ],
        hiddenTestCases: [
            {
                input: "6 4 0 5 0 0 3",
                outputReal: "4 5 3 0 0 0",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains integer n. Then n integers representing module statuses.",
        outputFormat: "Array with zeroes moved to the end, preserving relative order of non-zero elements.",
        constraintsTime: "1 <= n <= 10^5",
        constraintsSpace: "O(1)",
    },
    {
        id: 21,
        name: "Almost Palindrome",
        description: "You’re building a text validation engine. Sometimes, user input has a typo. You need to verify whether a string can become a palindrome by removing **at most one character**. Return true if it can, false otherwise.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    s: "abca",
                },
                outputReal: "true",
            },
            {
                input: {
                    s: "abc",
                },
                outputReal: "false",
            },
        ],
        realTestCases: [
            {
                input: "abca",
                output: "true",
            },
            {
                input: "abc",
                output: "false",
            },
        ],
        hiddenTestCases: [
            {
                input: "deeee",
                outputReal: "true",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A single string of lowercase characters.",
        outputFormat: "Boolean: true if the string can become a palindrome by removing at most one character, otherwise false.",
        constraintsTime: "1 <= s.length <= 10^5",
        constraintsSpace: "O(1)",
    },
    {
        id: 22,
        name: "Climb-o-Tron",
        description: "You're coding a fitness tracker for a robotic staircase simulator. The robot can take 1 or 2 steps at a time. Given the total number of steps `n`, find how many distinct ways the robot can climb to the top.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 2,
                },
                outputReal: "2",
            },
            {
                input: {
                    n: 3,
                },
                outputReal: "3",
            },
        ],
        realTestCases: [
            {
                input: "2",
                output: "2",
            },
            {
                input: "3",
                output: "3",
            },
        ],
        hiddenTestCases: [
            {
                input: "10",
                outputReal: "89",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "A single integer n representing the number of steps.",
        outputFormat: "An integer representing the number of distinct ways to climb the stairs.",
        constraintsTime: "1 <= n <= 45",
        constraintsSpace: "O(1)",
    },
    {
        id: 23,
        name: "Security House Robber",
        description: "A security AI is monitoring a street of houses, each with a certain value of stored items. The AI must rob houses such that no two adjacent houses are robbed. Return the maximum amount that can be robbed without triggering alarms.",
        difficulty: "Easy",
        displayTestCases: [
            {
                input: {
                    n: 4,
                    values: "1 2 3 1",
                },
                outputReal: "4",
            },
            {
                input: {
                    n: 5,
                    values: "2 7 9 3 1",
                },
                outputReal: "12",
            },
        ],
        realTestCases: [
            {
                input: "4 1 2 3 1",
                output: "4",
            },
            {
                input: "5 2 7 9 3 1",
                output: "12",
            },
        ],
        hiddenTestCases: [
            {
                input: "6 9 1 1 9 1 1",
                outputReal: "18",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line contains n. Then n integers representing values in each house.",
        outputFormat: "Maximum value that can be robbed without robbing adjacent houses.",
        constraintsTime: "1 <= n <= 10^4",
        constraintsSpace: "O(1)",
    },
    {
        id: 24,
        name: "CoinCraft",
        description: "You are designing an in-game economy system. Players must exchange coins to buy items, and each coin type has a denomination. Given unlimited coins of each type, return the fewest number of coins needed to make a given amount. If it’s not possible, return -1.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 3,
                    coins: "1 2 5",
                    amount: 11,
                },
                outputReal: "3",
            },
            {
                input: {
                    n: 2,
                    coins: "2 4",
                    amount: 7,
                },
                outputReal: "-1",
            },
        ],
        realTestCases: [
            {
                input: "3 1 2 5 11",
                output: "3",
            },
            {
                input: "2 2 4 7",
                output: "-1",
            },
        ],
        hiddenTestCases: [
            {
                input: "4 3 5 7 10 23",
                outputReal: "4",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line: n (number of coin types). Next n integers: coin denominations. Final line: amount to reach.",
        outputFormat: "Fewest number of coins needed, or -1 if not possible.",
        constraintsTime: "1 <= amount <= 10^4",
        constraintsSpace: "O(amount)",
    },
    {
        id: 25,
        name: "Level Up Progression",
        description: "You’re developing a ranking system for a multiplayer game. Each player progresses based on increasingly higher scores. Given a list of scores, return the length of the longest strictly increasing subsequence.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 6,
                    scores: "10 9 2 5 3 7",
                },
                outputReal: "3",
            },
            {
                input: {
                    n: 6,
                    scores: "0 1 0 3 2 3",
                },
                outputReal: "4",
            },
        ],
        realTestCases: [
            {
                input: "6 10 9 2 5 3 7",
                output: "3",
            },
            {
                input: "6 0 1 0 3 2 3",
                output: "4",
            },
        ],
        hiddenTestCases: [
            {
                input: "8 1 3 6 7 2 5 8 9",
                outputReal: "6",
            },
        ],
        topics: ['string', 'array', 'dynamic programming', 'binary search', 'greedy', 'linked list', 'tree', 'graph', 'trie'],
        inputFormat: "First line: n. Then n space-separated integers representing scores.",
        outputFormat: "Length of longest increasing subsequence.",
        constraintsTime: "1 <= n <= 2500",
        constraintsSpace: "O(n^2) or O(n log n)",
    },
    {
        id: 26,
        name: "Matrix Zoner",
        description: "A surveillance system tracks movement across a city represented as a 2D matrix. Each cell has an integer. You must return the elements of the matrix in spiral order, simulating a camera sweep from top-left outward.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    rows: 3,
                    cols: 3,
                    matrix: "1 2 3 4 5 6 7 8 9",
                },
                outputReal: "1 2 3 6 9 8 7 4 5",
            },
        ],
        realTestCases: [
            {
                input: "3 3 1 2 3 4 5 6 7 8 9",
                output: "1 2 3 6 9 8 7 4 5",
            },
        ],
        hiddenTestCases: [
            {
                input: "2 4 1 2 3 4 5 6 7 8",
                outputReal: "1 2 3 4 8 7 6 5",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First two integers: number of rows and columns. Next values: row-wise matrix values.",
        outputFormat: "List of integers in spiral order.",
        constraintsTime: "1 <= rows, cols <= 10^2",
        constraintsSpace: "O(n*m)",
    },
    {
        id: 27,
        name: "Trie Trekker",
        description: "You're creating an auto-complete engine using a prefix tree. Implement a system that allows inserting words and checking if a prefix exists in any inserted word.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    ops: "insert insert startsWith",
                    words: "apple app app",
                },
                outputReal: "true",
            },
        ],
        realTestCases: [
            {
                input: "3 insert insert startsWith apple app app",
                output: "true",
            },
        ],
        hiddenTestCases: [
            {
                input: "4 insert insert insert startsWith leetcode learn lesson let let",
                outputReal: "true",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First integer: number of operations. Followed by pairs of operation and word.",
        outputFormat: "Boolean for startsWith operation.",
        constraintsTime: "1 <= operations <= 10^4",
        constraintsSpace: "O(n)",
    },
    {
        id: 28,
        name: "Skyline Histogram",
        description: "Given an array representing heights of buildings (bars), find the largest rectangular area possible in the histogram formed. This helps simulate skyline-based coverage planning.",
        difficulty: "Hard",
        displayTestCases: [
            {
                input: {
                    n: 7,
                    heights: "2 1 5 6 2 3 1",
                },
                outputReal: "10",
            },
        ],
        realTestCases: [
            {
                input: "7 2 1 5 6 2 3 1",
                output: "10",
            },
        ],
        hiddenTestCases: [
            {
                input: "6 6 2 5 4 5 1",
                outputReal: "12",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First integer: n (number of bars). Next line: heights of bars.",
        outputFormat: "Maximum area of rectangle in histogram.",
        constraintsTime: "1 <= n <= 10^5",
        constraintsSpace: "O(n)",
    },
    {
        id: 29,
        name: "Max Island Area",
        description: "You’re processing satellite data of an archipelago. Each cell in a 2D grid is either water (0) or land (1). Return the size of the largest landmass (island) formed by connected 1s (horizontal or vertical).",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    rows: 4,
                    cols: 5,
                    grid: "0 0 1 0 0 1 1 1 0 0 0 0 0 0 1 0 1 0 0 0",
                },
                outputReal: "4",
            },
        ],
        realTestCases: [
            {
                input: "4 5 0 0 1 0 0 1 1 1 0 0 0 0 0 0 1 0 1 0 0 0",
                output: "4",
            },
        ],
        hiddenTestCases: [
            {
                input: "3 4 1 1 0 0 0 1 1 1 0 0 0 0",
                outputReal: "5",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First two integers: rows and cols. Then row-wise values of the grid.",
        outputFormat: "Maximum number of cells in a single island.",
        constraintsTime: "1 <= rows, cols <= 50",
        constraintsSpace: "O(rows * cols)",
    },
    {
        id: 30,
        name: "Decode Master",
        description: "You’re decoding messages from a cryptic communication device. Each digit maps to a letter ('1'->'A', ..., '26'->'Z'). Given a digit string, return the total number of ways to decode it.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    s: "226",
                },
                outputReal: "3",
            },
            {
                input: {
                    s: "06",
                },
                outputReal: "0",
            },
        ],
        realTestCases: [
            {
                input: "226",
                output: "3",
            },
            {
                input: "06",
                output: "0",
            },
        ],
        hiddenTestCases: [
            {
                input: "11106",
                outputReal: "2",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "Single string of digits with no spaces.",
        outputFormat: "Total number of valid decodings.",
        constraintsTime: "1 <= s.length <= 100",
        constraintsSpace: "O(n)",
    },
    {
        id: 31,
        name: "Water Trap Engineer",
        description: "Simulate rainwater collection. Given an elevation map of bars (non-negative integers), compute how much water can be trapped after it rains.",
        difficulty: "Hard",
        displayTestCases: [
            {
                input: {
                    n: 12,
                    heights: "0 1 0 2 1 0 1 3 2 1 2 1",
                },
                outputReal: "6",
            },
        ],
        realTestCases: [
            {
                input: "12 0 1 0 2 1 0 1 3 2 1 2 1",
                output: "6",
            },
        ],
        hiddenTestCases: [
            {
                input: "6 4 2 0 3 2 5",
                outputReal: "9",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First integer n, then n space-separated integers representing heights.",
        outputFormat: "Total water units that can be trapped.",
        constraintsTime: "1 <= n <= 2 * 10^4",
        constraintsSpace: "O(n)",
    },
    {
        id: 32,
        name: "Rotten Oranges",
        description: "You're simulating a food quality monitoring system. Given a grid where 0 = empty, 1 = fresh orange, and 2 = rotten orange, return the minimum minutes needed for all oranges to rot. If impossible, return -1.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    rows: 3,
                    cols: 3,
                    grid: "2 1 1 1 1 0 0 1 1",
                },
                outputReal: "4",
            },
        ],
        realTestCases: [
            {
                input: "3 3 2 1 1 1 1 0 0 1 1",
                output: "4",
            },
        ],
        hiddenTestCases: [
            {
                input: "2 2 0 2 2 1",
                outputReal: "1",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First line: rows and columns. Then row-wise values (0,1,2).",
        outputFormat: "Minimum minutes to rot all oranges, or -1.",
        constraintsTime: "1 <= rows, cols <= 10",
        constraintsSpace: "O(rows * cols)",
    },
    {
        id: 33,
        name: "Subarray Sum Target",
        description: "A real-time transaction monitor tracks the sum of user activities. Given an integer array `nums` and integer `k`, return the total number of continuous subarrays whose sum equals `k`.",
        difficulty: "Medium",
        displayTestCases: [
            {
                input: {
                    n: 5,
                    nums: "1 1 1 2 1",
                    k: 3,
                },
                outputReal: "4",
            },
        ],
        realTestCases: [
            {
                input: "5 1 1 1 2 1 3",
                output: "4",
            },
        ],
        hiddenTestCases: [
            {
                input: "6 1 2 3 -2 2 1 4",
                outputReal: "3",
            },
        ],
        topics: ['greedy', 'tree', 'graph', 'math', 'sorting', 'stack', 'queue'],
        inputFormat: "First line: n. Next line: n integers. Final value: target sum k.",
        outputFormat: "Total number of subarrays whose sum is equal to k.",
        constraintsTime: "1 <= n <= 2*10^4",
        constraintsSpace: "O(n)",
    },
];
