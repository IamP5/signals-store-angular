import { Injectable, computed, inject, signal } from '@angular/core';
import { CategoryResponse, CreateCategory, DeleteCategory, UpdateCategory } from '../interfaces/category.model';
import { ApiService } from './api.service';
import { Subject, concatMap, concatWith, mergeAll, mergeMap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoStore } from './todo.service';

export interface CategoryState {
  categories: CategoryResponse[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryStore {
  private api = inject(ApiService);
  private todoStore = inject(TodoStore);

  // state
  private state = signal<CategoryState>({
    categories: [],
    loaded: false,
  })

  // selectors
  categories = computed(() => this.state().categories)
  loaded = computed(() => this.state().loaded)

  // sources
  private categoriesLoaded$ = this.api.loadCategories();
  
  add$ = new Subject<CreateCategory>()
  update$ = new Subject<UpdateCategory>()
  delete$ = new Subject<DeleteCategory>()

  constructor() { 
    this.categoriesLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (categories) => {
        this.state.update(state => ({
          ...state,
          categories,
          loaded: true,
        }))
      }
    })

    this.add$.pipe(
      takeUntilDestroyed(),
      switchMap(category => this.api.addCategory(category))
    ).subscribe({
      next: (newCategory) => {
        this.state.update(state => ({
          ...state,
          categories: [...state.categories, newCategory],
        }))
      }
    })

    this.update$.pipe(
      takeUntilDestroyed(),
      switchMap(category => this.api.updateCategory(category))
    ).subscribe({
      next: (updatedCategory) => {
        this.state.update(state => ({
          ...state,
          categories: state.categories.map(category => category.id === updatedCategory.id ? updatedCategory : category),
        }))
      }
    })

    this.delete$.pipe(
      takeUntilDestroyed(),
      switchMap(category => {
        this.todoStore.deleteByCategory$.next({ categoryId: category.id });
        return this.api.deleteCategory(category);
      }),
    ).subscribe({
      next: (categoryId) => {
        this.state.update(state => ({
          ...state,
          categories: state.categories.filter(category => category.id !== categoryId),
        }))
      }
    })
  }
}
