import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido/pedido';
import { DataService } from '../../services/data.service';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css', '../../../styles/shared-buttons.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  statusColors: { [key in 'Pendente' | 'Em andamento' | 'Concluído' | 'Cancelado']: string } = {
    'Pendente': 'status-pending',
    'Em andamento': 'status-progress',
    'Concluído': 'status-completed',
    'Cancelado': 'status-cancelled'
  };

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadPedidos();
  }

  private loadPedidos() {
    this.pedidos = this.dataService.getPedidos();
    console.log(this.pedidos);
  }

  getStatusClass(status: string): string {
    return this.statusColors[status as keyof typeof this.statusColors] || 'status-default';
  }

  getInsumosText(pedido: Pedido): string {
    return `${pedido.insumos.length} ${pedido.insumos.length === 1 ? 'item' : 'itens'}`;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  onNovoPedido() {
    this.router.navigate(['/dashboard/pedidos/novo']);
  }

  visualizarPedido(id: number) {
    this.router.navigate([`/dashboard/pedidos/${id}`]);
  }
}
