export interface Todo {
   id: number;
  text: string;
  completed: boolean;
}

export interface PomodoroConfig {
  workDuration: number;
  shorBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  autoStartBreak: boolean;
  autoStartWork: boolean;
  soundNotifications: boolean;
}

export interface BackgroundImage{
  id: number;
  url:string;
  name: string;
}
