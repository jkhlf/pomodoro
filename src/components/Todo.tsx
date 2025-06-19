

import { useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"
import type { Todo } from "../types"
import { Checkbox } from "./ui/Checkbox"

interface TodoListProps {
  todos: Todo[]
  onAddTodo: (text: string) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

export function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [newTodo, setNewTodo] = useState("")

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim())
      setNewTodo("")
    }
  }

  const completedTodos = todos.filter((todo) => todo.completed).length

  return (
    <div className="backdrop-blur-xl bg-black/20 border-white/10 p-6 rounded-xl shadow-xl">
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-lg font-mono font-bold text-white">// TODO</h2>
          <p className="text-gray-400 font-mono text-xs">
            {completedTodos}/{todos.length} completed
          </p>
        </div>

        {/* Add Todo */}
        <div className="flex gap-2">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder="$ add task..."
            className="font-mono bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg backdrop-blur-sm text-sm"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-lg backdrop-blur-sm border border-white/20 px-3"
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
            style={{
              width: `${todos.length > 0 ? (completedTodos / todos.length) * 100 : 0}%`,
            }}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                todo.completed
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              } backdrop-blur-sm`}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggleTodo(todo.id)}
                className="border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <span
                className={`flex-1 font-mono text-xs ${todo.completed ? "text-gray-400 line-through" : "text-white"}`}
              >
                {todo.completed ? "✓ " : "○ "}
                {todo.text}
              </span>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md p-1"
              >
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          ))}

          {todos.length === 0 && (
            <div className="text-center py-6 text-gray-400 font-mono">
              <p className="text-xs">// No tasks yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
