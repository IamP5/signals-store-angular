import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../interfaces/todo.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DeleteTodo, UpdateTodo } from 'src/app/@shared/interfaces/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div 
      *ngIf="todo" 
      class="todo" 
      [ngClass]="{ 'todo--completed': todo.completed == true }"
    >
      <section class="todo__info">
        <div class="update" (click)="toggleTodo()">
          <input class="status" type="checkbox" [(ngModel)]="todo.completed" (ngModelChange)="updateTodoEvent.emit({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            categoryId: todo.categoryId
          })" />
          <span class="title">{{ todo.title }}</span>
        </div>

        <mat-icon class="delete" (click)="deleteTodoEvent.emit(todo)">delete</mat-icon>
      </section>

      <section class="todo__category-info">
        <span class="category">{{ todo.categoryName }}</span>
      </section>
    </div>
  `,
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {
  @Input()
  todo!: Todo;

  @Output()
  deleteTodoEvent = new EventEmitter<DeleteTodo>();

  @Output()
  updateTodoEvent = new EventEmitter<UpdateTodo>();

  toggleTodo() {
    this.todo.completed = !this.todo.completed;
    this.updateTodoEvent.emit({
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      categoryId: this.todo.categoryId
    });
  }
}
