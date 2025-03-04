import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="body-grid">
      <ng-container *ngFor="let item of filteredItems">
        <div class="body-item" [routerLink]="item.route">
          <div class="item-content">
            <i class="material-icons">{{item.icon}}</i>
            <span>{{item.label}}</span>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {
  menuItems = [
    { icon: 'assignment', label: 'Ordens de serviço', route: '/dashboard/ordens' },
    { icon: 'speed', label: 'Medições', route: '/dashboard/medicoes' },
    { icon: 'shopping_cart', label: 'Pedidos de compra', route: '/dashboard/pedidos' },
    { icon: 'build', label: 'Inventário ferramental', route: '/dashboard/inventario' },
    { icon: 'people', label: 'Colaboradores', route: '/dashboard/colaboradores' },
    { icon: 'analytics', label: 'Estatísticas', route: '/dashboard/estatisticas' }
  ];

  filteredItems = this.menuItems;

  constructor(private searchService: SearchService) {
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
