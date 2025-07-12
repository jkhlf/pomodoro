import type { PomodoroConfig } from "../../types";

interface SessionTrackerProps {
    sessions: number;
    config: PomodoroConfig;
}

export function SessionTracker({ sessions, config }: SessionTrackerProps) {
    return (
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
    );
}
