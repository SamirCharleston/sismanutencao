import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { MenuService } from '../../services/menu.service';
import { SearchService } from '../../services/search.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideMenuComponent, RouterLink],
  template: `
    <div class="dashboard-container">
      <app-side-menu [items]="menuItems"></app-side-menu>
      
      <div class="main-content" [class.menu-expanded]="menuService.isExpanded$ | async">
        <app-header></app-header>
        
        <div class="dashboard-grid">
          <ng-container *ngFor="let item of filteredItems">
            <div class="dashboard-item" [routerLink]="item.route">
              <div class="item-content">
                <i class="material-icons">{{item.icon}}</i>
                <span>{{item.label}}</span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menuItems = [
    { icon: 'assignment', label: 'Ordens de serviço', route: '/ordens' },
    { icon: 'speed', label: 'Medições', route: '/medicoes' },
    { icon: 'shopping_cart', label: 'Pedidos de compra', route: '/pedidos' },
    { icon: 'build', label: 'Inventário ferramental', route: '/inventario' },
    { icon: 'people', label: 'Colaboradores', route: '/colaboradores' },
    { icon: 'analytics', label: 'Estatísticas', route: '/estatisticas' },
    { icon: 'local_shipping', label: 'Frota', route: '/frota' },
    { icon: 'route', label: 'Logística', route: '/logistica' }
  ];

  filteredItems = this.menuItems;

  constructor(
    public menuService: MenuService,
    private searchService: SearchService
  ) {
    this.searchService.searchTerm$.subscribe(term => {
      if (!term) {
        this.filteredItems = this.menuItems;
      } else {
        this.filteredItems = this.menuItems.filter(item =>
          item.label.toLowerCase().includes(term.toLowerCase())
        );
      }
    });
  }
}
