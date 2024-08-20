import { ReactNode, RefObject, useEffect, useRef, useState } from "react";

function App() {
  const durRef = useRef<HTMLSpanElement>(null);
  const trackerRef = useRef(0);

  useEffect(() => {
    const handler = () => {
      console.log("keydown");
      trackerRef.current++;
      if (durRef.current) durRef.current.innerText = String(trackerRef.current);
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

function App() {

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="mx-4 font-bold mb-10 mt-2">Press and Hold "X" to Act</h1>
        <div className="">
          X - <span className="dur" ref={durRef}></span>
        </div>
      </div>
    </main>
  );
}

export default App;
