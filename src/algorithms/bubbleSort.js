// This function does NOT sort the array directly.
// It generates "steps" that the UI will play as animations.

export function bubbleSortSteps(inputArray) {
  const steps = [];

  // Make a copy so we don't mutate React state
  const arr = [...inputArray];

  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      
      // STEP 1: comparison
      steps.push({
        type: "compare",
        indices: [j, j + 1],
      });

      // STEP 2: swap if needed
      if (arr[j] > arr[j + 1]) {
        // swap in local copy
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // push swap step with new array snapshot
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr],
        });
      }
    }
  }

  return steps;
}
