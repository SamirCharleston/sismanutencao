import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrar', component: RegistrarComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'ordens', component: DashboardComponent },
      { path: 'medicoes', component: DashboardComponent },
      { path: 'pedidos', component: DashboardComponent },
      { path: 'inventario', component: DashboardComponent },
      { path: 'colaboradores', component: DashboardComponent },
      { path: 'estatisticas', component: DashboardComponent }
    ]
  }
];
