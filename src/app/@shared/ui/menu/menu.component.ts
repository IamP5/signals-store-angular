import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <nav class="menu">
      <a routerLink="/todos" routerLinkActive="active">
        <mat-icon>home</mat-icon>
        <span>Todos</span>
      </a>
      <a routerLink="/categories" routerLinkActive="active">
        <mat-icon>category</mat-icon>
        <span>Categories</span>
      </a>
    </nav>
  `,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

}
