import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import TodoFilter from './components/TodoFilter';
import { Todo, TodoFormData, FilterOptions } from './types/Todo';
import { todoService } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOptions>({
    completed: undefined,
    priority: undefined,
    search: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0
  });

  // TODO 목록 가져오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getTodos(filter);
      setTodos(data.todos);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 통계 정보 가져오기
  const fetchStats = async () => {
    try {
      const statsData = await todoService.getStats();
      setStats(statsData);
    } catch (err) {
      console.error('통계를 가져오는데 실패했습니다:', err);
    }
  };

  // 새 TODO 추가
  const handleAddTodo = async (todoData: TodoFormData) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      await fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'TODO 추가에 실패했습니다.');
    }
  };

  // TODO 완료 상태 토글
  const handleToggleTodo = async (id: string) => {
    try {
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(prev => prev.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
      await fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'TODO 상태 변경에 실패했습니다.');
    }
  };

  // TODO 수정
  const handleUpdateTodo = async (id: string, todoData: Partial<TodoFormData>) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
      await fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'TODO 수정에 실패했습니다.');
    }
  };

  // TODO 삭제
  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      await fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'TODO 삭제에 실패했습니다.');
    }
  };

  // 필터 변경 핸들러
  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  // 초기 데이터 로드 및 필터 변경시 데이터 재로드
  useEffect(() => {
    fetchTodos();
  }, [filter]);

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p>효율적인 할 일 관리로 생산성을 높여보세요!</p>
        </header>

        {error && (
          <div className="error-message">
            <span>❌ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <div className="app-content">
          <div className="left-panel">
            <TodoForm onAddTodo={handleAddTodo} />
            <TodoStats stats={stats} />
          </div>

          <div className="right-panel">
            <TodoFilter
              filter={filter}
              onFilterChange={handleFilterChange}
            />

            <TodoList
              todos={todos}
              loading={loading}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
