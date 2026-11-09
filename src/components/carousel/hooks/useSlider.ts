import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

export function useSlider(content: ReactNode[], preset: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [play, setPlay] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!play || content.length < 2) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.length);
    }, preset);

    return () => clearInterval(intervalId);
  }, [play, preset, content.length, resetKey]);

  const activeIndexHandler = useCallback((value: number) => {
    setActiveIndex(value);
    setResetKey((key) => key + 1);
  }, []);

  const playHandler = useCallback(() => {
    setPlay((prev) => !prev);
  }, []);

  return { activeIndex, play, activeIndexHandler, playHandler };
}
