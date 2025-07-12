export interface Todo {
   id: number;
  text: string;
  completed: boolean;
}

export interface PomodoroConfig {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  autoStartBreak: boolean;
  autoStartWork: boolean;
  soundNotifications: boolean;
}

export interface BackgroundImage{
  id: string;
  url:string;
  name: string;
}


