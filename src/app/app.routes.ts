import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeDashboardComponent } from './pages/dashboard/home-dashboard/home-dashboard.component';
import { OrdensDeServicoComponent } from './pages/ordens-de-servico/ordens-de-servico.component';
import { OrdemDetalhesComponent } from './pages/ordem-detalhes/ordem-detalhes.component';
import { MedicoesComponent } from './pages/medicoes/medicoes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrar', component: RegistrarComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', component: HomeDashboardComponent },
      { path: 'ordens', component: OrdensDeServicoComponent },
      { path: 'ordens/:numero', component: OrdemDetalhesComponent },
      { path: 'medicoes', component: MedicoesComponent },
      { path: 'medicoes/:numero', component: MedicoesComponent }, // Para detalhes da medição
      { path: 'pedidos', component: DashboardComponent },
      { path: 'inventario', component: DashboardComponent },
      { path: 'colaboradores', component: DashboardComponent },
      { path: 'estatisticas', component: DashboardComponent },
      { path: 'frota', component: DashboardComponent },
      { path: 'logistica', component: DashboardComponent }
    ]
  }
];
