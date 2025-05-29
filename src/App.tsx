import { useEffect, useRef, useState } from 'react';

type Todo = {
  id: Number
  text: String
  completed: boolean
}

export const App = () => {

  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak]= useState(false)
  const [todos, SetTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false },
    { id: 3, text: "Build a Pomodoro Timer", completed: false }
  ])
  const [newTodo, setNewTodo] = useState("")
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if( isRunning && timeLeft > 0) {
      intervalRef.current = setInterval (() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
    setIsRunning(false)
      if (!isBreak){
        setSessions((prev) => prev + 1 )
        setIsBreak(true)
        setTimeLeft(5 * 60)
      } else {
        setIsBreak(false)
        setTimeLeft(25 * 60)
      }
  } else {
    if(intervalRef.current){
      clearInterval(intervalRef.current)
    }
  }

  return () => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }
}, [isRunning, timeLeft, isBreak])



  return (
    <div>App</div>
  )
}


