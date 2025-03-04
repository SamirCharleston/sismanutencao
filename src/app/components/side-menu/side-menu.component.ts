import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="side-menu" [class.expanded]="menuService.isExpanded$ | async">
      <div class="menu-items">
        <a *ngFor="let item of items" 
           [routerLink]="item.route"
           class="menu-item">
          <i class="material-icons">{{item.icon}}</i>
          <span class="label">{{item.label}}</span>
        </a>
      </div>
      <div class="logout-container">
        <a class="menu-item logout-button" (click)="onLogout()">
          <i class="material-icons">logout</i>
          <span class="label">Sair</span>
        </a>
      </div>
    </aside>
  `,
  styles: [`
    .side-menu {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      background: white;
      width: 60px;
      transition: width 0.3s ease;
      box-shadow: 2px 0 4px rgba(0,0,0,0.1);
      overflow-x: hidden;
    }

    .side-menu.expanded {
      width: 240px;
    }

    .menu-items {
      padding: 1rem 0;
      margin-top: 60px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      color: #666;
      text-decoration: none;
      transition: background-color 0.3s ease;
      white-space: nowrap;
    }

    .menu-item:hover {
      background-color: #f0f0f0;
      color: #ff9248;
    }

    .menu-item i {
      margin-right: 1rem;
    }

    .label {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .expanded .label {
      opacity: 1;
    }

    .logout-container {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #eee;
    }

    .logout-button {
      color: #ff5252;
      cursor: pointer;
    }

    .logout-button:hover {
      background-color: #fff1f1;
      color: #ff3333;
    }
  `]
})
export class SideMenuComponent {
  @Input() items: any[] = [];

  constructor(
    public menuService: MenuService,
    private loaderService: LoaderService
  ) {}

  async onLogout() {
    await this.loaderService.navigateWithLoader('/home');
  }
}
