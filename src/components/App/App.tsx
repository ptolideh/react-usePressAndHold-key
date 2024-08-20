import { ReactNode, RefObject, useEffect, useRef, useState } from "react";

function App() {
  const [dur, setDur] = useState(0);
  const [status, setStatus] = useState<"start" | "end" | "idle">("idle");
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (dur === 1) {
      setStatus("start");
      setTimeout(() => {
        setStatus("end");
      }, 1000);
    }
  }, [dur]);

  useEffect(() => {
    console.log({ status });
    if (status === "end") {
      const color = [255, 255, 255]
        .map((val) => `${Math.floor(Math.random() * val)}`)
        .join(",");
      console.log(color);
      if (containerRef.current)
        containerRef.current.style.backgroundColor = `rgb(${color})`;
    }
  }, [status]);

  useEffect(() => {
    if (status !== "end") {
      const handler = () => {
        setDur((prevDur) => prevDur + 1);
      };

      window.addEventListener("keydown", handler);
      return () => {
        window.removeEventListener("keydown", handler);
      };
    }
  }, [setDur, status]);

  useEffect(() => {
    const handler = () => {
      setDur(0);
      setStatus("idle");
    };
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, []);

  return (
    <main ref={containerRef} className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="mx-4 font-bold mb-10 mt-2">Press and Hold "X" to Act</h1>
        <div className="">
          X - <span className="dur">{dur}</span>
        </div>
      </div>
    </main>
  );
}

export default App;
