// Generates steps for Selection Sort (visual-friendly)
export function selectionSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    // compare current minimum with rest
    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: "compare",
        indices: [minIndex, j],
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // swap min with current position
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      steps.push({
        type: "swap",
        indices: [i, minIndex],
        array: [...arr],
      });
    }
  }

  return steps;
}
