import { Todo, TodoFormData, FilterOptions, TodoStats } from '../types/Todo';

const API_BASE_URL = 'http://localhost:5000/api';

class TodoService {
  private async fetchApi(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '요청에 실패했습니다.');
    }

    return response.json();
  }

  async getTodos(filter: FilterOptions = {}): Promise<{ todos: Todo[]; pagination: any }> {
    const queryParams = new URLSearchParams();

    if (filter.completed !== undefined) {
      queryParams.append('completed', filter.completed.toString());
    }

    if (filter.priority) {
      queryParams.append('priority', filter.priority);
    }

    if (filter.category) {
      queryParams.append('category', filter.category);
    }

    if (filter.search) {
      queryParams.append('search', filter.search);
    }

    const queryString = queryParams.toString();
    const endpoint = `/todos${queryString ? `?${queryString}` : ''}`;

    return this.fetchApi(endpoint);
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.fetchApi(`/todos/${id}`);
  }

  async createTodo(todoData: TodoFormData): Promise<Todo> {
    return this.fetchApi('/todos', {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  }

  async updateTodo(id: string, todoData: Partial<TodoFormData>): Promise<Todo> {
    return this.fetchApi(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todoData),
    });
  }

  async deleteTodo(id: string): Promise<void> {
    await this.fetchApi(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleTodo(id: string): Promise<Todo> {
    return this.fetchApi(`/todos/${id}/toggle`, {
      method: 'PATCH',
    });
  }

  async getStats(): Promise<TodoStats> {
    return this.fetchApi('/todos/stats');
  }
}

export const todoService = new TodoService();