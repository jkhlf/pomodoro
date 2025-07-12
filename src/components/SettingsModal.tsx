import { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';
import type { PomodoroConfig } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: PomodoroConfig;
    onSave: (newConfig: PomodoroConfig) => void;
}

export function SettingsModal({ isOpen, onClose, config, onSave }: SettingsModalProps) {
    const [localConfig, setLocalConfig] = useState(config);

    useEffect(() => {
        setLocalConfig(config);
    }, [config, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setLocalConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : Number(value)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50" onClick={onClose}>
            <div className="backdrop-blur-xl bg-black/20 border border-white/10 p-8 rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold font-mono">SETTINGS</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <FaX size={20} />
                    </button>
                </div>

                <div className="space-y-4 text-sm">
                    <label className="block">
                        <span className="text-gray-300">Focus (minutes)</span>
                        <input type="number" name="workDuration" value={localConfig.workDuration} onChange={handleInputChange} className="w-full mt-1 bg-white/5 p-2 rounded-lg border-white/10"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Short Break (minutes)</span>
                        <input type="number" name="shortBreakDuration" value={localConfig.shortBreakDuration} onChange={handleInputChange} className="w-full mt-1 bg-white/5 p-2 rounded-lg border-white/10"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Long Break (minutes)</span>
                        <input type="number" name="longBreakDuration" value={localConfig.longBreakDuration} onChange={handleInputChange} className="w-full mt-1 bg-white/5 p-2 rounded-lg border-white/10"/>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                        <input type="checkbox" name="autoStartBreak" checked={localConfig.autoStartBreak} onChange={handleInputChange} className="w-4 h-4 accent-cyan-400 bg-white/10 border-none" />
                        <span>Auto-start breaks</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="autoStartWork" checked={localConfig.autoStartWork} onChange={handleInputChange} className="w-4 h-4 accent-cyan-400 bg-white/10 border-none"/>
                        <span>Auto-start focus sessions</span>
                    </label>
                </div>

                <div className="mt-8 text-right">
                    <button onClick={() => onSave(localConfig)} className="px-6 py-2 bg-green-500/80 font-bold rounded-lg hover:bg-green-600/80 transition-colors">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
