import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaCoffee } from 'react-icons/fa';
type Todo = {
  id: Number
  text: String
  completed: boolean
}

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
    <main className='min-h-screen relative'>
      <div className='relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl'>
          <div className='background-blur-xl bg-black/20 border-white/10 p-8 rounded-2xl shadow-2xl'>
            <div text-center space-y-8>
              <div className=' flex items-center justify-center gap-2'>
                {isBreak ? <FaCoffee className='w-6 h-6'/> : <FaBrain className='w-6 h-6'/>}
                <h1>
                  {isBreak? "BREAK TIME" : "FOCUS MODE"}
                </h1>
              </div>
               <p className='font-mono text-sm'>
                  Sessions completed: <span>{sessions}</span>
               </p>
            </div>

              <div className='spacey-4'>
                <div>{formatTime(timeLeft)}</div>
                <div className='w-full bg-white/10 rounded-full h-2 overflow-hidden'>
                  <div className={`h-full transition-all duration-1000 ${isBreak ? "bg-orange-400" : "bg-green-400"}`}
                  style={{width: `${(((isBreak ? 5 * 60 : 25 * 60) - timeLeft) / (isBreak ? 5 * 60 : 25 * 60)) * 100}`}}>

                  </div>
                </div>
              </div>

              <div>
                <button onClick={toggleTimer} className={`font-mono px-8 py-4 text-lg rounded-xl transition-all
                  ${isRunning ? "bg-red" : "bg-green"} backdrop-blur-sm border border-white/20`}>
                  {isRunning ? "Pause" : "Start"}
                </button>
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;


