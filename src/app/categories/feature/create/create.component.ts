import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateCategory } from 'src/app/@shared/interfaces/category.model';
import { CategoryStore } from 'src/app/@shared/data-access/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
   <h1 mat-dialog-title>Create Category</h1>
    <form mat-dialog-content>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput type="text" [(ngModel)]="newCategory.name" [ngModelOptions]="{standalone: true}">
      </mat-form-field>
    </form>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="dialogRef.close()">Close</button>
      <button mat-button mat-dialog-close (click)="createCategory()">Create</button>
    </div>
  `,
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  categoryStore = inject(CategoryStore);
  dialogRef = inject(MatDialogRef<CreateComponent>)

  newCategory = {} as CreateCategory

  createCategory() {
    this.categoryStore.add$.next(this.newCategory);
    this.dialogRef.close();
  }
}
