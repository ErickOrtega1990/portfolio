import { useEffect, useState } from "react";

export function useSlider(content: React.ReactNode[], preset: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [play, setPlay] = useState(true);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const IntervalId = setInterval(() => {
      setSegundos((prevSegundos) => prevSegundos + 1);
      if (activeIndex < content.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else setActiveIndex(0);
    }, preset);

    if (!play || reset) {
      clearInterval(IntervalId);
      if (reset) return setReset(false);
      return;
    }

    return () => clearInterval(IntervalId);
  }, [segundos, play, reset]);

  const activeIndexHandler = (value: number) => {
    setActiveIndex(value);
    setReset(true);
  };

  const playHandler = () => {
    setPlay(!play);
  };

  return {
    activeIndex,
    setActiveIndex,
    segundos,
    setSegundos,
    play,
    setPlay,
    reset,
    setReset,
    activeIndexHandler,
    playHandler,
  };
}
