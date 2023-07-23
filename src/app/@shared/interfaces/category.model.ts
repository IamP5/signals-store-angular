export interface CategoryResponse {
  id: number;
  name: string;
}

export interface CreateCategory {
  name: string;
}

export interface UpdateCategory {
  id: number;
  name: string;
}

export interface DeleteCategory { 
  id: number;
}