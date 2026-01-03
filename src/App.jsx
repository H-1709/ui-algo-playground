import { useEffect, useState } from "react";
import VisualArea from "./components/VisualArea";
import { generateArray } from "./utils/generateArray";
import { bubbleSortSteps } from "./algorithms/bubbleSort";
import { insertionSortSteps } from "./algorithms/insertionSort";
import { selectionSortSteps } from "./algorithms/selectionSort";
import { algorithmInfo } from "./utils/algorithmInfo";


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

  // algorithm selector
  // "bubble" | "selection"
  const [algorithm, setAlgorithm] = useState("bubble");



  // ---------- START SORT ----------
  const startSort = () => {
    if (status !== "idle") return;

    let generatedSteps = [];

    if (algorithm === "bubble") {
      generatedSteps = bubbleSortSteps(array);
    } else if (algorithm === "selection") {
      generatedSteps = selectionSortSteps(array);
    } else if (algorithm === "insertion") {
      generatedSteps = insertionSortSteps(array);
    }


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
  const getStepExplanation = () => {
    if (status !== "sorting") return "Ready to start.";

    const step = steps[currentStep];

    if (!step) return "Sorting completed.";

    if (step.type === "compare") {
      return "Comparing two elements to check their order.";
    }

    if (step.type === "swap") {
      return "Swapping elements because they are in the wrong order.";
    }

    return "";
  };

  // ---------- UI ----------
  return (

    <div className="app">
      <header className="header">
        <h1>Sorting Visualizer</h1>
        <p>Explore how sorting algorithms work</p>
      </header>

      <div className="card controls-card">

        {/* Algorithm Selector */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Algorithm:
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={status !== "idle"}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>

          </label>
        </div>


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

        {/* Speed Control */}
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

          <button onClick={startSort} disabled={status !== "idle"}>
            Start Sorting
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
      </div>
      <div className="content-layout">
        <div className="card visual-card">
  <div className="visual-header">Array Visualization</div>

  <VisualArea array={array} activeIndices={activeIndices} />
</div>


        <div className="card info-card">
          <div className="info-panel">
            <strong>{algorithmInfo[algorithm].name}</strong>

            <p>{algorithmInfo[algorithm].description}</p>

            <div className="complexity">
              <strong>Time Complexity</strong>
              <ul>
                <li>Best: {algorithmInfo[algorithm].time.best}</li>
                <li>Average: {algorithmInfo[algorithm].time.average}</li>
                <li>Worst: {algorithmInfo[algorithm].time.worst}</li>
              </ul>

              <strong>Space Complexity:</strong>{" "}
              {algorithmInfo[algorithm].space}
            </div>

            <em>{getStepExplanation()}</em>
          </div>
        </div>
      </div>

    </div>


  );
}

export default App;
