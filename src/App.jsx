import { useState } from "react";
import VisualArea from "./components/VisualArea";
import { generateArray } from "./utils/generateArray";
import { bubbleSortSteps } from "./algorithms/bubbleSort";


function App() {

  const [array, setArray] = useState(generateArray());
  const [status, setStatus] = useState("idle");
  // "idle" | "sorting" | "paused"

  const [activeIndices, setActiveIndices] = useState([]);
  const [speed, setSpeed] = useState(200); // ms
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const startBubbleSort = () => {
    if (status !== "idle") return;

    const generatedSteps = bubbleSortSteps(array);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setStatus("sorting");
    useEffect(() => {
      if (status !== "sorting") return;
      if (currentStep >= steps.length) {
        setActiveIndices([]);
        setStatus("idle");
        return;
      }

      const step = steps[currentStep];

      const timer = setTimeout(() => {
        if (step.type === "compare") {
          setActiveIndices(step.indices);
        }

        if (step.type === "swap") {
          setArray(step.array);
        }

        setCurrentStep((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }, [status, currentStep, steps, speed]);

  };

  return (
    <div className="app">
      <h2>UI Playground of Algorithms</h2>
      <div style={{ margin: "10px 0" }}>
        <label>
          Speed:
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </label>
      </div>


      <button onClick={() => setArray(generateArray())} disabled={status !== "idle"}>
        Generate New Array
      </button>

      <button onClick={startBubbleSort} disabled={status !== "idle"}>
        Start Bubble Sort
      </button>

      <button
        onClick={() => setStatus("paused")}
        disabled={status !== "sorting"}
      >
        Pause
      </button>

      <button
        onClick={() => setStatus("sorting")}
        disabled={status !== "paused"}
      >
        Resume
      </button>


      <VisualArea array={array} activeIndices={activeIndices} />
    </div>
  );
}

export default App;
