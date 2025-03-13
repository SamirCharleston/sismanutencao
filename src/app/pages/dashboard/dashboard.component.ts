import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SideMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menuItems = [
    { icon: 'assignment', label: 'Ordens de serviço', route: '/dashboard/ordens' },
    { icon: 'speed', label: 'Medições', route: '/medicoes' },
    { icon: 'shopping_cart', label: 'Pedidos de compra', route: '/pedidos' },
    { icon: 'build', label: 'Inventário Coletivo', route: '/dashboard/inventario' },
    { icon: 'people', label: 'Colaboradores', route: '/colaboradores' },
    { icon: 'analytics', label: 'Estatísticas', route: '/estatisticas' },
    { icon: 'local_shipping', label: 'Frota', route: '/frota' },
    { icon: 'route', label: 'Logística', route: '/logistica' }
  ];

  constructor(public menuService: MenuService) {}
}
