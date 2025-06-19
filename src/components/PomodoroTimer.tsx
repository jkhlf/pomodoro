import { useEffect, useRef, useState } from "react"
import { FaBrain, FaCoffee, FaPause } from "react-icons/fa"
import { FaPlay, FaRotate } from "react-icons/fa6"
import { FcDataConfiguration } from "react-icons/fc"
import type { PomodoroConfig } from "../types"

interface PomodoroTimerProps {
  config: PomodoroConfig
  onOpenSettings: () => void
}

export function PomodoroTimer({ config, onOpenSettings }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(config.workDuration * 60)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [isLongBreak, setIsLongBreak] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)

      if (!isBreak) {
        setSessions((prev) => {
          const newSessions = prev + 1
          const shouldLongBreak = newSessions % config.sessionsUntilLongBreak === 0
          setIsLongBreak(shouldLongBreak)
          setIsBreak(true)
          setTimeLeft(shouldLongBreak ? config.longBreakDuration * 60 : config.shorBreakDuration * 60)

          if (config.autoStartBreak) {
            setIsActive(true)
          }

          return newSessions
        })
      } else {
        setIsBreak(false)
        setIsLongBreak(false)
        setTimeLeft(config.workDuration * 60)

        if (config.autoStartWork) {
          setIsActive(true)
        }
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, isBreak, config])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setIsLongBreak(false)
    setTimeLeft(config.workDuration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="backdrop-blur-xl bg-black/20 border-white/10 p-6 rounded-xl shadow-xl">
      <div className="text-center space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400">
            {isBreak ? <FaCoffee className="w-5 h-5" /> : <FaBrain className="w-5 h-5" />}
            <h1 className="text-lg font-mono font-bold">
              {isBreak ? (isLongBreak ? "LONG BREAK" : "SHORT BREAK") : "FOCUS"}
            </h1>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg p-1"
          >
            <FcDataConfiguration className="w-4 h-4" />
          </button>
        </div>

        {/* Session Progress */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 font-mono">Sessions: {sessions}</span>
          <div className="flex items-center gap-1">
            {[...Array(config.sessionsUntilLongBreak)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < sessions % config.sessionsUntilLongBreak ? "bg-cyan-400" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="space-y-3">
          <div className="text-5xl font-mono font-bold text-white tracking-wider">{formatTime(timeLeft)}</div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${isBreak ? "bg-orange-400" : "bg-green-400"}`}
              style={{
                width: `${(() => {
                  let totalTime
                  if (isBreak) {
                    totalTime = isLongBreak ? config.longBreakDuration * 60 : config.shorBreakDuration * 60
                  } else {
                    totalTime = config.workDuration * 60
                  }
                  return ((totalTime - timeLeft) / totalTime) * 100
                })()}%`,
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleTimer}
            className={`font-mono px-6 py-2 text-sm rounded-lg transition-all ${
              isActive
                ? "bg-red-500/80 hover:bg-red-600/80 text-white"
                : "bg-green-500/80 hover:bg-green-600/80 text-white"
            } backdrop-blur-sm border border-white/20`}
          >
            {isActive ? (
              <>
                <FaPause className="w-4 h-4 mr-1" />
                PAUSE
              </>
            ) : (
              <>
                <FaPlay className="w-4 h-4 mr-1" />
                START
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="font-mono px-4 py-2 text-sm rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <FaRotate className="w-4 h-4 mr-1" />
            RESET
          </button>
        </div>
      </div>
    </div>
  )
}
