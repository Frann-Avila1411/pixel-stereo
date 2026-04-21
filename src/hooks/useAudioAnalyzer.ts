import { useEffect, useRef, useState } from "react";

export const useAudioAnalyzer = (audioElement: HTMLAudioElement | null) => {
  const [frequency, setFrequency] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const sourceElementRef = useRef<HTMLAudioElement | null>(null);

  const stopMeter = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setFrequency(0);
  };

  useEffect(() => {
    if (!audioElement) return;

    if (!audioCtxRef.current) {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextConstructor) {
        return;
      }

      audioCtxRef.current = new AudioContextConstructor();
    }

    if (!analyzerRef.current) {
      analyzerRef.current = audioCtxRef.current.createAnalyser();
      analyzerRef.current.fftSize = 64;
      analyzerRef.current.connect(audioCtxRef.current.destination);
    }

    if (sourceElementRef.current !== audioElement) {
      sourceRef.current?.disconnect();
      sourceRef.current = audioCtxRef.current.createMediaElementSource(audioElement);
      sourceRef.current.connect(analyzerRef.current);
      sourceElementRef.current = audioElement;
    }

    const startMeter = () => {
      const analyzer = analyzerRef.current;
      if (!analyzer) return;

      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const dataArray = new Uint8Array(analyzer.frequencyBinCount);

      const updateFrequency = () => {
        if (!analyzerRef.current || audioElement.paused || audioElement.ended) {
          stopMeter();
          return;
        }

        analyzerRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setFrequency(avg);
        rafRef.current = window.requestAnimationFrame(updateFrequency);
      };

      stopMeter();
      rafRef.current = window.requestAnimationFrame(updateFrequency);
    };

    const handlePlay = () => startMeter();
    const handlePause = () => stopMeter();

    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);

    if (!audioElement.paused) {
      startMeter();
    }

    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      stopMeter();
    };
  }, [audioElement]);

  return frequency;
};