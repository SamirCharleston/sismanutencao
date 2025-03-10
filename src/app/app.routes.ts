import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeDashboardComponent } from './pages/dashboard/home-dashboard/home-dashboard.component';
import { OrdensDeServicoComponent } from './pages/ordens-de-servico/ordens-de-servico.component';
import { OrdemDetalhesComponent } from './pages/ordem-detalhes/ordem-detalhes.component';
import { MedicoesComponent } from './pages/medicoes/medicoes.component';
import { MedicaoDetalhesComponent } from './pages/medicao-detalhes/medicao-detalhes.component';
import { OrdemNovoComponent } from './pages/ordem-novo/ordem-novo.component';
import { MedicaoNovoComponent } from './pages/medicao-novo/medicao-novo.component';
import { PedidosComponent } from './pages/pedidos-compra/pedidos.component';
import { PedidoNovoComponent } from './pages/pedidos-compra/pedido-novo/pedido-novo.component';
import { PedidoDetalhesComponent } from './pages/pedidos-compra/pedido-detalhes/pedido-detalhes.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { ColaboradorDetalhesComponent } from './pages/colaboradores/colaborador-detalhes/colaborador-detalhes.component';
import { ColaboradorNovoComponent } from './pages/colaboradores/colaborador-novo/colaborador-novo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrar', component: RegistrarComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', component: HomeDashboardComponent },
      { path: 'ordens/novo', component: OrdemNovoComponent }, // This route must come before :numero
      { path: 'ordens/:numero', component: OrdemDetalhesComponent },
      { path: 'ordens', component: OrdensDeServicoComponent },
      { path: 'medicoes/novo', component: MedicaoNovoComponent }, // Add this route before :numero
      { path: 'medicoes/:numero', component: MedicaoDetalhesComponent }, // Para detalhes da medição
      { path: 'medicoes', component: MedicoesComponent },
      { path: 'pedidos/novo', component: PedidoNovoComponent },
      { path: 'pedidos/:id', component: PedidoDetalhesComponent },
      { path: 'pedidos', component: PedidosComponent }, // Add this route
      { path: 'colaboradores/novo', component: ColaboradorNovoComponent },
      { path: 'colaboradores/:id', component: ColaboradorDetalhesComponent },
      { path: 'colaboradores', component: ColaboradoresComponent },
      { path: 'inventario', component: DashboardComponent },
      { path: 'estatisticas', component: DashboardComponent },
      { path: 'frota', component: DashboardComponent },
      { path: 'logistica', component: DashboardComponent }
    ]
  }
];
