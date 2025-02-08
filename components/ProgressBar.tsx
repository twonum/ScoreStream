"use client";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const totalScrollable = scrollHeight - clientHeight;
      const newProgress = (scrollTop / totalScrollable) * 100;
      setProgress(newProgress);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="w-full">
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 rounded-full bg-gradient-to-r from-slate-300 to-slate-600 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
