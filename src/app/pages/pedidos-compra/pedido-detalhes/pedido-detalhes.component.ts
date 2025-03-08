import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../../models/pedido/pedido';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detalhes.component.html',
  styleUrls: ['./pedido-detalhes.component.css', '../../../../styles/shared-buttons.css']
})
export class PedidoDetalhesComponent implements OnInit {
  pedido: Pedido | null = null;
  statusColors = {
    'Pendente': 'status-pending',
    'Em andamento': 'status-progress',
    'Concluído': 'status-completed',
    'Cancelado': 'status-cancelled'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (!isNaN(id)) {
        this.loadPedido(id);
      } else {
        this.router.navigate(['/dashboard/pedidos']);
      }
    });
  }

  private loadPedido(id: number) {
    const pedido = this.dataService.getPedidos().find(p => p.id === id);
    if (pedido) {
      console.log('Pedido encontrado:', pedido);
      this.pedido = pedido;
    } else {
      console.log('Pedido não encontrado:', id);
      this.router.navigate(['/dashboard/pedidos']);
    }
  }

  getStatusClass(status: keyof typeof this.statusColors): string {
    return this.statusColors[status] || 'status-default';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  calcularTotalInsumo(quantidade: number, valorUnitario: number): number {
    return quantidade * valorUnitario;
  }

  onEdit() {
    // TODO: Implement edit functionality
  }

  onDelete() {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      // TODO: Implement delete functionality
      this.router.navigate(['/dashboard/pedidos']);
    }
  }

  onBack() {
    this.router.navigate(['/dashboard/pedidos']);
  }

  onPrint() {
    window.print();
  }
}
