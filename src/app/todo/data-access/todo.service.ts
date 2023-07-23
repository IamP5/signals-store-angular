import { Injectable, computed, inject } from '@angular/core';
import { CategoryStore } from 'src/app/@shared/data-access/category.service';
import { TodoStore } from 'src/app/@shared/data-access/todo.service';
import { Todo } from '../interfaces/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoStore = inject(TodoStore);
  categoryStore = inject(CategoryStore);

  todos = computed<Todo[]>(() => this.todoStore.todos().map(todo => ({
    ...todo,
    categoryName: this.categoryStore.categories().find(category => category.id === todo.categoryId)?.name
  })));

  constructor() { }
}
