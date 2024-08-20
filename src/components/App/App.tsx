import { useEffect, useRef, useState } from "react";

const TIME_OUT_DURATION = 2000;

function App() {
  const [status, setStatus] = useState<"keydown" | "completed" | "idle">(
    "idle"
  );
  const [progressWidth, setProgressWidth] = useState(0);

  const containerRef = useRef<HTMLElement>(null);

  // start listening to keydown if in idle state
  useEffect(() => {
    if (status === "idle") {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "w") setStatus("keydown");
      };
      window.addEventListener("keydown", handler);
      return () => {
        window.removeEventListener("keydown", handler);
      };
    }
  }, [status]);

  // track how long the key been pressed
  // signal the end once completed
  // update progress bar
  useEffect(() => {
    let intervalToken: NodeJS.Timeout | null = null;
    let timeoutToken: NodeJS.Timeout | null = null;

    const reset = () => {
      if (intervalToken) clearInterval(intervalToken);
      if (timeoutToken) clearTimeout(timeoutToken);
      setProgressWidth(0);
    };

    if (status === "keydown") {
      intervalToken = setInterval(() => {
        setProgressWidth((prevWidth) => prevWidth + 1);
      }, Math.ceil(TIME_OUT_DURATION / 100));

      timeoutToken = setTimeout(() => {
        setStatus("completed");
      }, TIME_OUT_DURATION);
    } else {
      reset();
    }

    return reset;
  }, [status]);

  // reset status back to idle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "w") {
        setStatus("idle");
      }
    };
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, []);

  // change color when key's been pressed for full duration
  useEffect(() => {
    if (status === "completed") {
      const color = [255, 255, 255]
        .map((val) => `${Math.floor(Math.random() * val)}`)
        .join(",");
      console.log(color);
      if (containerRef.current)
        containerRef.current.style.backgroundColor = `rgb(${color})`;
    }
  }, [status]);

  return (
    <main ref={containerRef} className="container mx-auto bg-slate-200">
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="mx-4 font-bold mb-10 mt-2">Press and Hold "X" to Act</h1>
        <div
          id="key-container"
          className="flex items-center justify-center relative w-16 h-16 border-2 border-white text-4xl rounded-lg"
        >
          <span className="relative z-10">W</span>
          <span
            id="progress-ui"
            style={{
              width: `${progressWidth}%`,
            }}
            className="absolute h-full bg-white z-0"
          ></span>
        </div>
      </div>
    </main>
  );
}

export default App;
