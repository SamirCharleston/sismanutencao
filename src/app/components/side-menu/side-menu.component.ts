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
      <button class="menu-toggle" (click)="menuService.toggle()" [class.expanded]="menuService.isExpanded$ | async">
        <div class="menu-icon-wrapper">
          <i class="material-icons">{{ (menuService.isExpanded$ | async) ? 'menu_open' : 'menu' }}</i>
          <span class="tooltip">{{ (menuService.isExpanded$ | async) ? 'Recolher menu' : 'Expandir menu' }}</span>
        </div>
      </button>

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

    .menu-toggle {
      position: absolute;
      top: 15px;
      right: -25px;
      width: 48px;
      height: 48px;
      border-radius: 24px;
      background: #ff9248;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .menu-icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-toggle:hover {
      background: #ffaa70;
      transform: scale(1.05);
    }

    .menu-toggle i {
      color: white;
      font-size: 24px;
      transition: transform 0.3s ease;
    }

    .menu-toggle.expanded i {
      transform: rotate(180deg);
    }

    .tooltip {
      position: absolute;
      right: calc(100% + 10px);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .menu-toggle:hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    .tooltip::after {
      content: '';
      position: absolute;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 4px solid rgba(0, 0, 0, 0.8);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
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
