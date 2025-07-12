import { useState } from 'react';
import type { Todo } from '../types';
import { FaPlus, FaTrash } from "react-icons/fa6";

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/20 border-white/10 p-6 rounded-xl shadow-xl h-full flex flex-col">
      <h2 className="text-lg font-mono font-bold mb-4">TODO LIST</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-white/10 p-2 rounded-lg border-2 border-transparent focus:border-cyan-400/50 focus:outline-none placeholder-gray-400"
        />
        <button type="submit" className="p-3 bg-cyan-500/80 rounded-lg hover:bg-cyan-600/80 transition-colors">
          <FaPlus size={14} />
        </button>
      </form>
      <ul className="space-y-2 overflow-y-auto flex-grow pr-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center bg-white/5 p-3 rounded-lg group">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleTodo(todo.id)}
              className="w-5 h-5 rounded bg-white/20 border-none mr-4 accent-green-400 cursor-pointer"
            />
            <span className={`flex-grow transition-colors ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => onDeleteTodo(todo.id)} className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
              <FaTrash size={14} />
            </button>
          </li>
        ))}
         {todos.length === 0 && (
            <p className="text-center text-gray-400 py-4">No tasks yet. Add one!</p>
        )}
      </ul>
    </div>
  );
}
