import type { PomodoroConfig } from "../types";
import { usePomodoro } from "../hooks/usePomodoro";
import { ModeDisplay } from "./timer/ModeDisplay";
import { SessionTracker } from "./timer/SessionTracker";
import { TimerDisplay } from "./timer/TimerDisplay";
import { TimerControls } from "./timer/TimerControls";

interface PomodoroTimerProps {
  config: PomodoroConfig;
  onOpenSettings: () => void;
}

export function PomodoroTimer({ config, onOpenSettings }: PomodoroTimerProps) {
  const {
    timeLeft,
    isActive,
    isBreak,
    isLongBreak,
    sessions,
    toggleTimer,
    resetTimer,
    formatTime,
    totalDuration,
  } = usePomodoro(config);

  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="backdrop-blur-xl bg-black/20 border-white/10 p-6 rounded-xl shadow-xl">
      <div className="text-center space-y-4">
        <ModeDisplay
            isBreak={isBreak}
            isLongBreak={isLongBreak}
            onOpenSettings={onOpenSettings}
        />
        <SessionTracker
            sessions={sessions}
            config={config}
        />
        <TimerDisplay
            formattedTime={formatTime(timeLeft)}
            progress={progress}
            isBreak={isBreak}
        />
        <TimerControls
            isActive={isActive}
            onToggle={toggleTimer}
            onReset={resetTimer}
        />
      </div>
    </div>
  );
}
