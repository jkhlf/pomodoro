import { FaPause, FaPlay, FaRotate } from "react-icons/fa6";

interface TimerControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function TimerControls({ isActive, onToggle, onReset }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onToggle}
        className={`flex items-center justify-center font-mono px-6 py-2 text-sm rounded-lg transition-all ${
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
        onClick={onReset}
        className="flex items-center justify-center font-mono px-4 py-2 text-sm rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
      >
        <FaRotate className="w-4 h-4 mr-1" />
        RESET
      </button>
    </div>
  );
}
