import { FaBrain, FaCoffee } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";

interface ModeDisplayProps {
  isBreak: boolean;
  isLongBreak: boolean;
  onOpenSettings: () => void;
}

export function ModeDisplay({ isBreak, isLongBreak, onOpenSettings }: ModeDisplayProps) {
  return (
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
        <GrConfigure className="w-4 h-4" />
      </button>
    </div>
  );
}
