import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrarComponent } from './pages/auth/registrar/registrar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeDashboardComponent } from './pages/dashboard/home-dashboard/home-dashboard.component';
import { OrdensDeServicoComponent } from './pages/ordem-servico/lista/ordens-de-servico.component';
import { OrdemDetalhesComponent } from './pages/ordem-servico/detalhes/ordem-detalhes.component';
import { MedicoesComponent } from './pages/medicao/lista/medicoes.component';
import { MedicaoDetalhesComponent } from './pages/medicao/detalhes/medicao-detalhes.component';
import { OrdemNovoComponent } from './pages/ordem-servico/novo/ordem-novo.component';
import { MedicaoNovoComponent } from './pages/medicao/novo/medicao-novo.component';
import { PedidosComponent } from './pages/pedidos-compra/lista/pedidos.component';
import { PedidoNovoComponent } from './pages/pedidos-compra/novo/pedido-novo.component';
import { PedidoDetalhesComponent } from './pages/pedidos-compra/detalhes/pedido-detalhes.component';
import { ColaboradoresComponent } from './pages/colaboradores/lista/colaboradores.component';
import { ColaboradorDetalhesComponent } from './pages/colaboradores/detalhes/colaborador-detalhes.component';
import { ColaboradorNovoComponent } from './pages/colaboradores/novo/colaborador-novo.component';
import { InventarioColetivoComponent } from './pages/inventario-coletivo/lista/inventario-coletivo.component';
import { NovoComponent } from './pages/inventario-coletivo/novo/novo.component';
import { DetalhesComponent } from './pages/inventario-coletivo/detalhes/detalhes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
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
      { path: 'colaboradores/:id', component: ColaboradorDetalhesComponent }, // Add this route route
      { path: 'colaboradores', component: ColaboradoresComponent },
      { path: 'inventario/novo', component: NovoComponent },
      { path: 'inventario/:id', component: DetalhesComponent },
      { path: 'inventario', component: InventarioColetivoComponent },
      { path: 'estatisticas', component: DashboardComponent },
      { path: 'frota', component: DashboardComponent },
      { path: 'logistica', component: DashboardComponent }
    ]
  }
];
