import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from memory on component mount
  useEffect(() => {
    const savedTodos = [
      { id: 1, text: 'Learn React', completed: false },
      { id: 2, text: 'Build a todo app', completed: true },
      { id: 3, text: 'Practice coding', completed: false }
    ];
    setTodos(savedTodos);
  }, []);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-2">Todo App</h1>
          <p className="text-center text-purple-100">Stay organized, stay productive</p>
        </div>

        {/* Add Todo Input */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl text-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === filterType
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{activeTodosCount} active</span>
            <span>{completedTodosCount} completed</span>
            <span>{todos.length} total</span>
          </div>
        </div>

        {/* Todo List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-lg font-medium mb-1">No todos here</p>
              <p className="text-sm">
                {filter === 'active' && 'All tasks completed! Great job!'}
                {filter === 'completed' && 'No completed tasks yet'}
                {filter === 'all' && 'Add your first todo above'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                    todo.completed ? 'opacity-60' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 text-sm font-bold ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {todo.completed ? '✓' : ''}
                  </button>
                  
                  <span
                    className={`flex-1 transition-all duration-200 ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 p-1 rounded transition-colors duration-200 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center text-xs text-gray-500">
          Built with React & Tailwind CSS
        </div>
      </div>
    </div>
  );
}