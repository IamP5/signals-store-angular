import { Injectable, computed, inject, signal } from '@angular/core';
import { CreateTodo, DeleteTodo, DeleteTodoByCategory, TodoResponse, UpdateTodo } from '../interfaces/todo.model';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from './api.service';

export interface TodoState {
  todos: TodoResponse[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoStore {
  private api = inject(ApiService);

  // state
  private state = signal<TodoState>({
    todos: [],
    loaded: false,
  })

  //selectors
  todos = computed(() => this.state().todos)
  loaded = computed(() => this.state().loaded)
  totalTodos = computed(() => this.state().todos.length)
  completedTodos = computed(() => this.state().todos.filter(todo => todo.completed).length)

  //sources
  private todosLoaded$ = this.api.loadTodos();

  add$ = new Subject<CreateTodo>()
  update$ = new Subject<UpdateTodo>()
  delete$ = new Subject<DeleteTodo>()
  deleteByCategory$ = new Subject<DeleteTodoByCategory>()

  constructor() {
    // reducers
    this.todosLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (todos) => {
        this.state.update(state => ({
          ...state,
          todos,
          loaded: true,
        }))
      }
    })

    this.add$.pipe(
      takeUntilDestroyed(), 
      switchMap(todo => this.api.addTodo(todo))
    )
    .subscribe({
      next: (newTodo) => {
        this.state.update(state => ({
          ...state,
          todos: [...state.todos, newTodo],
        }))
      }
    })

    this.update$.pipe(
      takeUntilDestroyed(),
      switchMap(todo => this.api.updateTodo(todo))
    ).subscribe({
      next: (updatedTodo) => {
        this.state.update(state => ({
          ...state,
          todos: state.todos.map(currentTodo => 
            currentTodo.id === updatedTodo.id 
              ? updatedTodo 
              : currentTodo
            ),
        }))
      }
    })

    this.delete$.pipe(
      takeUntilDestroyed(),
      switchMap(todo => this.api.deleteTodo(todo.id))
    ).subscribe({
      next: (todoId) => {
        this.state.update(state => ({
          ...state,
          todos: state.todos.filter(todo => todo.id !== todoId),
        }))
      },
    })

    this.deleteByCategory$.pipe(
      takeUntilDestroyed(),
    ).subscribe({
      next: (e) => {
        this.state.update(state => ({
          ...state,
          todos: state.todos.filter(todo => todo.categoryId !== e.categoryId),
        }))
      },
    })
  } 
}
