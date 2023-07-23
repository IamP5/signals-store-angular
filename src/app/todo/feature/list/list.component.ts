import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../data-access/todo.service';
import { Todo } from '../../interfaces/todo.model';
import { TodoStore } from 'src/app/@shared/data-access/todo.service';
import { DeleteTodo, UpdateTodo } from 'src/app/@shared/interfaces/todo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoCardComponent } from '../../ui/todo-card/todo-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TodoCardComponent, MatButtonModule, MatIconModule],
  template: `
    <main class="list" *ngIf="todoStore.loaded() else skeleton">
      <section class="list__info">
        <h2>Todos</h2>
        <span class="total">Total: {{ todoStore.totalTodos() }}</span>
        <span class="completed">Completed: {{ todoStore.completedTodos() }}</span>
      </section>

      <app-todo-card 
        *ngFor="let todo of todoService.todos()" 
        [todo]="todo"
        (updateTodoEvent)="todoStore.update$.next($event)"
        (deleteTodoEvent)="todoStore.delete$.next($event)">
      </app-todo-card>
    </main>

    <ng-template #skeleton>
      <h2>Loading...</h2>
    </ng-template>
  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  todoService = inject(TodoService);
  todoStore = inject(TodoStore);
  createDialog = inject(MatDialog);
}
