import { useEffect, useRef, useState } from "react";

export const useAudioAnalyzer = (audioElement: HTMLAudioElement | null) => {
  const [frequency, setFrequency] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyzerRef.current = audioCtxRef.current.createAnalyser();
        analyzerRef.current.fftSize = 64;
        
        sourceRef.current = audioCtxRef.current.createMediaElementSource(audioElement);
        sourceRef.current.connect(analyzerRef.current);
        analyzerRef.current.connect(audioCtxRef.current.destination);
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const analyzer = analyzerRef.current;
      if (!analyzer) return;

      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      
      const updateFrequency = () => {
        if (!analyzerRef.current) return;
        analyzerRef.current.getByteFrequencyData(dataArray);
        
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setFrequency(avg);
        
        if (!audioElement.paused) {
          requestAnimationFrame(updateFrequency);
        } else {
          setFrequency(0);
        }
      };

      updateFrequency();
    };

    audioElement.addEventListener("play", initAudio);

    return () => {
      audioElement.removeEventListener("play", initAudio);
    };
  }, [audioElement]);

  return frequency;
};