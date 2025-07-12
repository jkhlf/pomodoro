interface TimerDisplayProps {
    formattedTime: string;
    progress: number;
    isBreak: boolean;
}

export function TimerDisplay({ formattedTime, progress, isBreak }: TimerDisplayProps) {
    return (
        <div className="space-y-3">
            <div className="text-5xl font-mono font-bold text-white tracking-wider">
                {formattedTime}
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${isBreak ? "bg-orange-400" : "bg-green-400"}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
