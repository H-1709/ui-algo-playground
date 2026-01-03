// Generates steps for Insertion Sort (visual-friendly)
export function insertionSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;

    // compare backward and shift elements
    while (j > 0) {
      steps.push({
        type: "compare",
        indices: [j - 1, j],
      });

      if (arr[j - 1] > arr[j]) {
        // swap
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

        steps.push({
          type: "swap",
          indices: [j - 1, j],
          array: [...arr],
        });

        j--;
      } else {
        break;
      }
    }
  }

  return steps;
}
