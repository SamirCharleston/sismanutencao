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
    { icon: 'speed', label: 'Medições', route: '/dashboard/ordens' },
    { icon: 'shopping_cart', label: 'Pedidos de compra', route: '/dashboard/pedidos' },
    { icon: 'build', label: 'Inventário Coletivo', route: '/dashboard/inventario' },
    { icon: 'people', label: 'Colaboradores', route: '/dashboard/colaboradores' },
    { icon: 'local_shipping', label: 'Frota', route: '/dashboard/frota' },
    { icon: 'route', label: 'Logística', route: '/dashboard/logistica' },
    { icon: 'analytics', label: 'Estatísticas', route: '/dashboard/estatisticas' },
  ];

  constructor(public menuService: MenuService) {}
}
