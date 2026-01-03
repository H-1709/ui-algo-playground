export const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Larger values 'bubble up' to the end of the array.",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
  },

  selection: {
    name: "Selection Sort",
    description:
      "Finds the smallest element in the unsorted portion and swaps it with the first unsorted position.",
    time: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
  },

  insertion: {
    name: "Insertion Sort",
    description:
      "Builds the sorted array one element at a time by inserting elements into their correct position.",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
  },
};
