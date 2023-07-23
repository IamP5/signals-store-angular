import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryStore } from 'src/app/@shared/data-access/category.service';
import { CategoryCardComponent } from '../../ui/category-card/category-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  template: `
    <main *ngIf="categoryStore.loaded() else skeleton" class="list">
      <h2>Categories</h2>
      <app-category-card 
        *ngFor="let category of categoryStore.categories()" 
        [category]="category"
        (deleteCategoryEvent)="categoryStore.delete$.next($event)">
      </app-category-card>
    </main>

    <ng-template #skeleton>
      <h2>Loading...</h2>
    </ng-template>
  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  categoryStore = inject(CategoryStore);
}
