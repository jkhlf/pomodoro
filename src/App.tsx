import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import type { PomodoroConfig, Todo, BackgroundImage } from "./types";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { SettingsModal } from "./components/SettingsModal";
import { CoffeeTracker } from "./components/CoffeTracker";
import { MusicPlayer } from "./components/MusicPlayer";
import { backgroundImages } from "./data/background";
import { TodoList } from "./components/TodoList";
import { BackgroundSelector } from "./components/Background";

const initialConfig: PomodoroConfig = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  autoStartBreak: false,
  autoStartWork: false,
  soundNotifications: false
};

function App() {
  const [config, setConfig] = useLocalStorage<PomodoroConfig>('pomodoroConfig', initialConfig);
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [currentBg, setCurrentBg] = useLocalStorage<BackgroundImage>('background', backgroundImages[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center transition-all duration-1000 text-white"
      style={{ backgroundImage: `url(${currentBg.url})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto p-4 md:p-6 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">

          <div className="md:col-span-3 lg:col-span-2 md:row-span-2">
            <PomodoroTimer
              config={config}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>

          <div className="lg:col-span-2">
            <TodoList
              todos={todos}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>

          <div className="grid grid-cols-2 lg:col-span-2 gap-6">
            <CoffeeTracker />
            <MusicPlayer />
          </div>
        </div>
      </div>
      
  <BackgroundSelector
        className="absolute bottom-6 right-6 z-20" // Posicionamento fixo
        images={backgroundImages}
        selected={currentBg}
        onSelect={setCurrentBg}
      />


      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={(newConfig) => {
          setConfig(newConfig);
          setIsSettingsOpen(false);
        }}
      />
    </main>
  );
}

export default App;
