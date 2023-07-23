import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from './@shared/ui/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateComponent as CreateTodo } from './todo/feature/create/create.component';
import { CreateComponent as CreateCategory } from './categories/feature/create/create.component';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, MatIconModule, MatDialogModule, MatButtonModule],
  template: `
    <header>
      <h2>Todo APP with Signals</h2>
    </header>
    <main>
      <router-outlet></router-outlet>
      <button 
        class="create-button" 
        mat-fab color="primary" 
        (click)="openCreateDialog('200ms', '200ms')">
        <mat-icon>create</mat-icon>
      </button>
    </main>
    <app-menu></app-menu>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-signal';

  createDialog = inject(MatDialog);
  router = inject(Router);

  openCreateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const currentUrl = this.router.url;
    
    if(currentUrl.includes('todos')) {
      this.createDialog.open(CreateTodo, {
        width: '80vw',
        height: '40vh',
        enterAnimationDuration,
        exitAnimationDuration,
      });

      return
    }

    this.createDialog.open(CreateCategory, {
      width: '80vw',
      height: '40vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
