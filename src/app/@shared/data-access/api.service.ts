import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTodo, TodoResponse, UpdateTodo } from '../interfaces/todo.model';
import { Observable, map, shareReplay } from 'rxjs';
import { CategoryResponse, CreateCategory, DeleteCategory, UpdateCategory } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.api_url;
  private http = inject(HttpClient);

  constructor() { }

  loadTodos() {
    return this.http.get<TodoResponse[]>(this.baseUrl + '/todos');
  }

  addTodo(todo: CreateTodo) {
    return this.http.post<TodoResponse>(`${this.baseUrl}/todos`, todo);
  }

  deleteTodo(todoId: number) {
    return this.http.delete<void>(`${this.baseUrl}/todos/${todoId}`).pipe(
      map(() => todoId)
    );
  }

  updateTodo(todo: UpdateTodo) {
    return this.http.patch<TodoResponse>(`${this.baseUrl}/todos/${todo.id}`, todo);
  }

  loadCategories() {
    return this.http.get<CategoryResponse[]>(`${this.baseUrl}/categories`);
  }

  addCategory(category: CreateCategory) {
    return this.http.post<CategoryResponse>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(category: UpdateCategory) {
    return this.http.patch<CategoryResponse>(`${this.baseUrl}/categories/${category.id}`, category);
  }

  deleteCategory(category: DeleteCategory) {
    return this.http.delete<void>(`${this.baseUrl}/categories/${category.id}`).pipe(
      map(() => category.id)
    );
  }
}
