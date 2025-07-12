import { useState, useEffect, useRef, useCallback } from 'react';
import type { PomodoroConfig } from '../types';

export const usePomodoro = (config: PomodoroConfig) => {
  const [timeLeft, setTimeLeft] = useState(config.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = useCallback(() => {
    if (isBreak) {
      return isLongBreak ? config.longBreakDuration * 60 : config.shortBreakDuration * 60;
    }
    return config.workDuration * 60;
  }, [isBreak, isLongBreak, config]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (!isBreak) {
        setSessions((prev) => {
          const newSessions = prev + 1;
          const shouldLongBreak = newSessions % config.sessionsUntilLongBreak === 0;

          setIsLongBreak(shouldLongBreak);
          setIsBreak(true);
          setTimeLeft(shouldLongBreak ? config.longBreakDuration * 60 : config.shortBreakDuration * 60);

          if (!config.autoStartBreak) setIsActive(false);

          return newSessions;
        });
      } else {
        setIsBreak(false);
        setIsLongBreak(false);
        setTimeLeft(config.workDuration * 60);

        if (!config.autoStartWork) setIsActive(false);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isBreak, config]);

  // Reset timer when config changes
  useEffect(() => {
    setIsActive(false);
    setIsBreak(false);
    setIsLongBreak(false);
    setSessions(0);
    setTimeLeft(config.workDuration * 60);
  }, [config]);


  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setIsLongBreak(false);
    setSessions(0);
    setTimeLeft(config.workDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    timeLeft,
    isActive,
    isBreak,
    isLongBreak,
    sessions,
    toggleTimer,
    resetTimer,
    formatTime,
    totalDuration: totalDuration(),
  };
};
