export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFormData {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: string;
  tags?: string[];
}

export interface FilterOptions {
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  search?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
}