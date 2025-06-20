import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaCoffee, FaPause, FaPlay, FaPlus, FaTrash } from 'react-icons/fa';
import { FaRotate } from 'react-icons/fa6';
import { CoffeeTracker } from './components/CoffeTracker';
import { MusicPlayer } from './components/MusicPlayer';
import { Checkbox } from './components/ui/Checkbox';
import type { Todo } from './types';

export const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false },
    { id: 3, text: "Build a Pomodoro Timer", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (!isBreak) {
        setSessions((prev) => prev + 1);
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  }

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos, {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false
        },
      ])
      setNewTodo("");
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) =>
      (todo.id === id ?
        { ...todo, completed: !todo.completed }
        : todo)));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const completedTodos = todos.filter((todo) => todo.completed).length;


  return (
    <main className='min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900'>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-8 min-h-screen'>
        <div className='lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-6 h-screen max-h-screen'>
          <div className='lg:col-span-2 lg:row-span-2 backdrop-blur-xl bg-black/20 border border-white/10 p-8 rounded-2xl shadow-2xl'>
            <div className="text-center space-y-8 h-full flex flex-col justify-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  {isBreak ? <FaCoffee className="w-8 h-8" /> : <FaBrain className="w-8 h-8" />}
                  <h1 className="text-3xl font-mono font-bold">{isBreak ? "// BREAK TIME" : "// FOCUS MODE"}</h1>
                </div>
                <p className="text-gray-400 font-mono text-lg">
                  Sessions completed: <span className="text-cyan-400 text-xl font-bold">{sessions}</span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="text-4xl font-mono font-bold text-white tracking-wider drop-shadow-2xl">{formatTime(timeLeft)}</div>

                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${isBreak ? "bg-gradient-to-r from-orange-400 to-red-400" : "bg-gradient-to-r from-green-400 to-emerald-400"}`}
                    style={{
                      width: `${(((isBreak ? 5 * 60 : 25 * 60) - timeLeft) / (isBreak ? 5 * 60 : 25 * 60)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className='flex items-center justify-center gap-6 mt-8'>
                <button onClick={toggleTimer} className={`font-mono px-8 py-4 text-xl rounded-xl transition-all transform hover:scale-105 ${
                    isRunning
                      ? "bg-red-500/80 hover:bg-red-600/80 text-white"
                      : "bg-green-500/80 hover:bg-green-600/80 text-white"
                  } backdrop-blur-sm border border-white/20 shadow-lg flex items-center gap-3`}
                >
                  {isRunning ? (
                    <> <FaPause className='w-6 h-6'/>  PAUSE </>) : (
                    <> <FaPlay className='w-6 h-6'/> START </>)}
                </button>

                <button onClick={resetTimer} className='font-mono px-8 py-4 text-xl rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-all transform hover:scale-105 shadow-lg flex items-center gap-3'>
                  <FaRotate className='w-6 h-6'/>
                  RESET
                </button>
              </div>
            </div>
          </div>

         <CoffeeTracker />

         <MusicPlayer />

          <div className="lg:row-span-2 backdrop-blur-xl bg-black/20 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <div className="space-y-6 h-full flex flex-col">
              <div className="space-y-2">
                <h2 className="text-2xl font-mono font-bold text-white">// TODO.md</h2>
                <p className="text-gray-400 font-mono text-sm">
                  Progress:{" "}
                  <span className="text-cyan-400">
                    {completedTodos}/{todos.length}
                  </span>{" "}
                  tasks completed
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  placeholder="$ add new task..."
                  className="flex-1 p-3 font-mono bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40 outline-none transition-all"
                />
                <button
                  onClick={addTodo}
                  className="bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-xl backdrop-blur-sm border border-white/20 px-4 transition-all transform hover:scale-105"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
                  style={{
                    width: `${todos.length > 0 ? (completedTodos / todos.length) * 100 : 0}%`,
                  }}
                />
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent'}}>
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all transform hover:scale-[1.02] ${
                      todo.completed
                        ? "bg-green-500/10 border border-green-500/20"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    } backdrop-blur-sm`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 border-2 border-white/30 rounded accent-green-500"
                    />
                    <span
                      className={`flex-1 font-mono text-sm ${
                        todo.completed ? "text-gray-400 line-through" : "text-white"
                      }`}
                    >
                      {todo.completed ? "✓ " : "○ "}
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg p-2 transition-all"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {todos.length === 0 && (
                  <div className="text-center py-8 text-gray-400 font-mono">
                    <p>// No tasks yet</p>
                    <p className="text-sm mt-2">Add your first task to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;
