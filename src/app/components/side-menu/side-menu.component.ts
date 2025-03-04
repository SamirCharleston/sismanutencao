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
      <!-- Botão de expandir (visível apenas quando menu recolhido) -->
      <button 
        *ngIf="!(menuService.isExpanded$ | async)"
        class="menu-toggle expand-button" 
        (click)="menuService.toggle()">
        <div class="menu-icon-wrapper">
          <i class="material-icons">menu</i>
          <span class="tooltip">Expandir menu</span>
        </div>
      </button>

      <!-- Botão de recolher (visível apenas quando menu expandido) -->
      <button 
        *ngIf="menuService.isExpanded$ | async"
        class="collapse-button" 
        (click)="menuService.toggle()">
        <i class="material-icons">chevron_left</i>
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
      padding-right: 24px; /* Espaço para o botão de recolher */
    }

    .menu-toggle {
      position: fixed;
      top: 15px;
      right: calc(100% - 84px);  /* Alterado para posicionar o círculo completo */
      width: 48px;
      height: 48px;
      border-radius: 50%;
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

    .collapse-button {
      position: absolute;
      top: 0;
      right: 0;
      height: 100vh;
      width: 24px;
      background: #f0f0f0;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border-left: 1px solid #e0e0e0;
    }

    .collapse-button:hover {
      background: #e0e0e0;
    }

    .collapse-button i {
      color: #666;
      font-size: 20px;
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
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
      left: calc(100% + 10px); /* Alterado de right para left */
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
      left: -4px; /* Alterado de right para left */
      top: 50%;
      transform: translateY(-50%);
      border-right: 4px solid rgba(0, 0, 0, 0.8); /* Alterado border-left para border-right */
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
    }

    .menu-items {
      padding: 1rem 0;
      margin-top: 60px;
      width: calc(100% - 24px); /* Ajuste para o botão de recolher */
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

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .collapse-button {
      animation: fadeIn 0.3s ease;
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
