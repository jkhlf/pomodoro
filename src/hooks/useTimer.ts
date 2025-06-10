import { useState, useEffect, useRef, useCallback } from "react";


export interface UseTimerOptions {
  focusDuration?: number;
  breakDuration?: number;
}

export function useTimer({focusDuration = 25 * 60, breakDuration = 5*60} : UseTimerOptions)
{
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() =>{
      setTimeLeft((t) => t - 1);
    }, 1000);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft > 0) return;
    setIsRunning(false);
    if(!isBreak) {
      setSessions(s => s + 1);
      setIsBreak(true);
      setTimeLeft(breakDuration);
    } else {
      setIsBreak(false);
      setTimeLeft(focusDuration);
    }
  },[timeLeft, isBreak,  focusDuration, breakDuration])

const toggle = useCallback(() => setIsRunning(r => !r), [])
const reset = useCallback(() => {
  setIsRunning(false);
  setIsBreak(false);
  setTimeLeft(focusDuration);
}, [focusDuration]);

  return { timeLeft, isRunning, isBreak, sessions, toggle, reset };
}
