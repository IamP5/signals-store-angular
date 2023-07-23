import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryResponse, DeleteCategory } from 'src/app/@shared/interfaces/category.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card *ngIf="category">
      <mat-card-header>
        <mat-card-title>{{category.name}}</mat-card-title>
        <mat-card-subtitle>Cateogry</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <button mat-raised-button color="primary">Edit</button>
        <button 
          mat-raised-button color="warn" 
          (click)="deleteCategoryEvent.emit({id: category.id})"
        >
          Delete
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input()
  category!: CategoryResponse

  @Output()
  deleteCategoryEvent = new EventEmitter<DeleteCategory>();
}
