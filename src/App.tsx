import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaCoffee, FaPause, FaPlay, FaTrash } from 'react-icons/fa';
import { FaRotate } from 'react-icons/fa6';


type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

//not using shadcn
const Button = ({ onClick, children, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>;
const Checkbox = ({ checked, onCheckedChange, ...props }: any) => <input type="checkbox" checked={checked} onChange={onCheckedChange} {...props} />;

export const App = () => {

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak]= useState(false);
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false },
    { id: 3, text: "Build a Pomodoro Timer", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);



  useEffect(() => {
    if( isRunning && timeLeft > 0) {
      intervalRef.current = setInterval (() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000)
    } else if (timeLeft === 0) {
    setIsRunning(false)
      if (!isBreak){
        setSessions((prev) => prev + 1 );
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
  } else {
    if(intervalRef.current){
      clearInterval(intervalRef.current);
    }
  }

  return () => {
    if(intervalRef.current) {
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
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2,"0")}`
}

const addTodo = () => {
  if (newTodo.trim()) {
    setTodos([
      ...todos,{
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
      { ... todo, completed: !todo.completed}
      : todo)));
}

const deleteTodo = (id: number) => {
  setTodos(todos.filter((todo) => todo.id !== id));
}

const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <main className='min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900'>

    <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl'>
          <div className='backdrop-blur-xl bg-black/20 border-white/10 p-8 rounded-2xl shadow-2xl'>
            <div text-center space-y-8>
              <div className='flex items-center justify-center gap-2 text-green-400'>
                {isBreak ? <FaCoffee className='w-6 h-6'/> : <FaBrain className='w-6 h-6'/>}
                <h1>
                  {isBreak? "BREAK TIME" : "FOCUS MODE"}
                </h1>
              </div>
               <p className='font-mono text-sm'>
                  Sessions completed: <span>{sessions}</span>
               </p>
            </div>

               <div className="space-y-4">
                <div className="text-8xl font-mono font-bold text-white tracking-wider">{formatTime(timeLeft)}</div>

                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${isBreak ? "bg-orange-400" : "bg-green-400"}`}
                    style={{
                      width: `${(((isBreak ? 5 * 60 : 25 * 60) - timeLeft) / (isBreak ? 5 * 60 : 25 * 60)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className='flex items-center justify-start gap-4 mt-6'>
                <button onClick={toggleTimer} className={`font-mono px-6 py-4 text-lg rounded-xl transition-all ${
                    isRunning
                      ? "bg-red-500/80 hover:bg-red-600/80 text-white"
                      : "bg-green-500/80 hover:bg-green-600/80 text-white"
                  } backdrop-blur-sm border border-white/20`}
                >
                  {isRunning ? (
                    <> <FaPause className='w-5 h-5 mr-2'/>  PAUSE </>) : (
                    <> <FaPlay className='w-5 h-5 mr-2'/> START </>)}
                </button>

                <button onClick={resetTimer} className='font-mono px-6 py-4 text-lg rounded-xl bg-white/20 backdrop-blur-sm'>
                <FaRotate className='w-5 h-5 mr-2'/>
                  Reset
                </button>
              </div>
          </div>
        </div>

        <div className='backdrop-blur-xl bg-black/20 border-white/10 p-8 rounded-2xl shadow-2xl'>
              <div className='space-y-6'>
                      <h2 className='text-2xl font-mono'> ToDo </h2>
                      <p> Progess: {""}
                      <span>{completedTodos}/{todos.length}</span>{""}
                      tasks completed
                      </p>
              </div>

               <div className='flex gap-2'>
                <input value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder='$ add new task'
                className='font-mono bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl'/>

                <button
                onClick={addTodo}
                className='bg-blue-500/80 hover:bg-blue-600 rounded-xl '>
                  <FaPlay className='w-5 h-5 mr-2'/>
                </button>
              </div>

              <div className='w-full bg-white/10 rounded-full h-2'>
                  <div className='h-full '  style= {{width: `${todos.length > 0 ?(completedTodos / todos.length) * 100 : 0}%`}}>

                  </div>
              </div>
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      todo.completed
                        ? "bg-green-500/10 border border-green-500/20"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    } backdrop-blur-sm`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span
                      className={`flex-1 font-mono text-sm ${
                        todo.completed ? "text-gray-400 line-through" : "text-white"
                      }`}
                    >
                      {todo.completed ? "✓ " : "○ "}
                      {todo.text}
                    </span>
                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                    >
                      <FaTrash className="w-4 h-4" />
                    </Button>
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
    </main>
  )
}

export default App;


