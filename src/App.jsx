import { useState } from "react";
import VisualArea from "./components/VisualArea";
import { generateArray } from "./utils/generateArray";
import { bubbleSortSteps } from "./algorithms/bubbleSort";
const [activeIndices, setActiveIndices] = useState([]);

function App() {
  const [array, setArray] = useState(generateArray());
  const [isSorting, setIsSorting] = useState(false);

  const startBubbleSort = () => {
    if (isSorting) return;

    setIsSorting(true);
    const steps = bubbleSortSteps(array);

    steps.forEach((step, index) => {
      setTimeout(() => {
        if (step.type === "swap") {
          setArray(step.array);
        }

        if (index === steps.length - 1) {
          setIsSorting(false);
        }
      }, index * 200);
    });
  };

  return (
    <div className="app">
      <h2>UI Playground of Algorithms</h2>

      <button onClick={() => setArray(generateArray())} disabled={isSorting}>
        Generate New Array
      </button>

      <button onClick={startBubbleSort} disabled={isSorting}>
        Bubble Sort
      </button>

      <VisualArea array={array} />
    </div>
  );
}

export default App;
