import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStore } from 'src/app/@shared/data-access/todo.service';
import { CategoryStore } from 'src/app/@shared/data-access/category.service';
import { CreateTodo } from 'src/app/@shared/interfaces/todo.model';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatOptionModule, MatSelectModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Create Todo</h1>
    <form mat-dialog-content>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input #title matInput type="text" (change)="titleAction.next(title.value)">
      </mat-form-field>

      <mat-form-field>
      <mat-label>Choose a Category</mat-label>
        <mat-select (selectionChange)="categoryId.set($event.value)">
          <mat-option 
            *ngFor="let category of categoryStore.categories()" 
            [value]="category.id">
            {{category.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </form>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="dialogRef.close()">Close</button>
      <button mat-button mat-dialog-close (click)="createTodo()">Create</button>
    </div>
  `,
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  categoryStore = inject(CategoryStore);
  todoStore = inject(TodoStore);
  dialogRef = inject(MatDialogRef<CreateComponent>)

  titleAction: Subject<string> = new Subject<string>();

  title = toSignal(this.titleAction.pipe(debounceTime(500), distinctUntilChanged()));
  categoryId = signal(0);

  newTodo = computed<CreateTodo>(() => ({
    title: this.title()!,
    categoryId: this.categoryId(),
    completed: false
  }));

  createTodo() {
    this.todoStore.add$.next(this.newTodo());
    this.dialogRef.close();
  }
}
