export interface TodoResponse {
  id: number;
  title: string;
  completed: boolean;
  categoryId: number;
}

export interface CreateTodo {
  title: string;
  categoryId: number;
  completed: boolean;
}

export interface UpdateTodo {
  id: number;
  title: string;
  completed: boolean;
  categoryId: number;
}

export interface DeleteTodo {
  id: number;
}

export interface DeleteTodoByCategory {
  categoryId: number;
}