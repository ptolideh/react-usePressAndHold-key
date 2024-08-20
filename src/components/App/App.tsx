import { useCallback, useEffect, useRef, useState } from "react";

///////////////////////////////////////////////////////////////
/**
 * usePressAndHold hook
 */

type PressAndHoldParams = {
  key: string;
  holdDuration?: number;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  onComplete?: () => void;
};
const usePressAndHold = ({
  key,
  holdDuration = 1000,
  onKeyDown,
  onKeyUp,
  onComplete,
}: PressAndHoldParams) => {
  const [status, setStatus] = useState<"pressed" | "completed" | "idle">(
    "idle"
  );
  const [progress, setProgress] = useState(0);

  // keydown -> start listening to keydown if in idle state
  useEffect(() => {
    if (status === "idle") {
      const handler = (e: KeyboardEvent) => {
        if (e.key === key) {
          setStatus("pressed");
          onKeyDown?.();
        }
      };
      window.addEventListener("keydown", handler);
      return () => {
        window.removeEventListener("keydown", handler);
      };
    }
  }, [status, key, onKeyDown]);

  // keyup -> reset status back to idle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) {
        onKeyUp?.();
        setStatus("idle");
      }
    };

    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [key, onKeyUp]);

  // track how long the key been pressed
  // signal the end once completed
  // update progress
  useEffect(() => {
    let intervalToken: NodeJS.Timeout | null = null;
    let timeoutToken: NodeJS.Timeout | null = null;

    const reset = () => {
      if (intervalToken) clearInterval(intervalToken);
      if (timeoutToken) clearTimeout(timeoutToken);
      setProgress(0);
    };

    if (status === "pressed") {
      intervalToken = setInterval(() => {
        setProgress((prevWidth) => prevWidth + 1);
      }, Math.ceil(holdDuration / 100));

      timeoutToken = setTimeout(() => {
        setStatus("completed");
        onComplete?.();
      }, holdDuration);
    } else {
      reset();
    }

    return reset;
  }, [status, holdDuration, onComplete]);

  return { status, progress };
};

/////////////////////////////////////////////////////////////
function App() {
  const containerRef = useRef<HTMLElement>(null);
  const holdDuration = 1500;
  const key = "w";
  const onHoldComplete = useCallback(() => {
    const color = [255, 255, 255]
      .map((val) => `${Math.floor(Math.random() * val)}`)
      .join(",");
    console.log(color);
    if (containerRef.current)
      containerRef.current.style.backgroundColor = `rgb(${color})`;
  }, [containerRef]);

  const { status, progress } = usePressAndHold({
    key,
    holdDuration,
    onComplete: onHoldComplete,
  });

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <main ref={containerRef} className="container mx-auto bg-slate-200">
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="mx-4 font-bold mb-10 mt-2">Press and Hold "W"</h1>
        <div
          id="key-container"
          className="flex items-center justify-center relative w-16 h-16 border-2 border-white text-4xl rounded-lg"
        >
          <span className="relative z-10">{key}</span>
          <span
            id="progress-ui"
            style={{
              width: `${progress}%`,
            }}
            className="absolute h-full bg-white z-0"
          ></span>
        </div>
      </div>
    </main>
  );
}

export default App;
