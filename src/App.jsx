import { useEffect, useState } from "react";
import VisualArea from "./components/VisualArea";
import { generateArray } from "./utils/generateArray";
import { bubbleSortSteps } from "./algorithms/bubbleSort";

function App() {
  // core data
  const [array, setArray] = useState(generateArray());

  // animation engine state
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // UI + control state
  const [activeIndices, setActiveIndices] = useState([]);
  const [speed, setSpeed] = useState(200);

  // finite state machine
  // "idle" | "sorting" | "paused"
  const [status, setStatus] = useState("idle");

  // mode: auto animation or manual stepping
  // "auto" | "step"
  const [mode, setMode] = useState("auto");

  // ---------- START SORT ----------
  const startBubbleSort = () => {
    if (status !== "idle") return;

    const generatedSteps = bubbleSortSteps(array);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setActiveIndices([]);
    setStatus("sorting");
  };

  // ---------- AUTO SORTING ENGINE ----------
  useEffect(() => {
    if (status !== "sorting") return;
    if (mode !== "auto") return;

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
  }, [status, currentStep, steps, speed, mode]);

  // ---------- STEP MODE CONTROLS ----------
  const nextStep = () => {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];

    if (step.type === "compare") {
      setActiveIndices(step.indices);
    }

    if (step.type === "swap") {
      setArray(step.array);
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep <= 0) return;

    const prevIndex = currentStep - 1;
    const step = steps[prevIndex];

    if (step.type === "swap") {
      setArray(step.array);
    }

    setActiveIndices([]);
    setCurrentStep(prevIndex);
  };

  // ---------- UI ----------
  return (
    <div className="app">
      <h2>UI Playground of Algorithms</h2>

      {/* Mode Selector */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Mode:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            disabled={status !== "idle"}
          >
            <option value="auto">Auto</option>
            <option value="step">Step-by-step</option>
          </select>
        </label>
      </div>

      {/* Speed Control (Auto only) */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Speed:
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={status !== "idle" || mode !== "auto"}
          />
        </label>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button
          onClick={() => setArray(generateArray())}
          disabled={status !== "idle"}
        >
          Generate New Array
        </button>

        <button
          onClick={startBubbleSort}
          disabled={status !== "idle"}
        >
          Start Bubble Sort
        </button>

        <button
          onClick={() => setStatus("paused")}
          disabled={status !== "sorting" || mode === "step"}
        >
          Pause
        </button>

        <button
          onClick={() => setStatus("sorting")}
          disabled={status !== "paused" || mode === "step"}
        >
          Resume
        </button>
      </div>

      {/* Step-by-step buttons */}
      {mode === "step" && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button onClick={prevStep} disabled={status !== "sorting"}>
            Prev
          </button>
          <button onClick={nextStep} disabled={status !== "sorting"}>
            Next
          </button>
        </div>
      )}

      {/* Visualization */}
      <VisualArea array={array} activeIndices={activeIndices} />
    </div>
  );
}

export default App;
