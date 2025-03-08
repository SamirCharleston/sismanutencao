import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../../models/pedido/pedido';
import { DataService } from '../../../services/data.service';
import { Insumo } from '../../../models/pedido/insumo';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detalhes.component.html',
  styleUrls: ['./pedido-detalhes.component.css', '../../../../styles/shared-buttons.css']
})
export class PedidoDetalhesComponent implements OnInit, OnDestroy {
  pedido: Pedido | null = null;
  statusColors = {
    'Pendente': 'status-pending',
    'Em andamento': 'status-progress',
    'Concluído': 'status-completed',
    'Cancelado': 'status-cancelled'
  };
  showImageModal = false;
  selectedInsumo: Insumo | null = null;
  currentImageIndex = 0;
  showHint = false;

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

  ngOnDestroy() {
    // Cleanup logic if needed
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.showImageModal && this.selectedInsumo) {
      switch (event.key) {
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'Escape':
          this.closeImageModal();
          break;
      }
    }
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

  showInsumoImages(insumo: Insumo) {
    this.selectedInsumo = insumo;
    this.currentImageIndex = 0;
    this.showImageModal = true;
    // Add focus to modal for keyboard navigation
    setTimeout(() => {
      const modalElement = document.querySelector('.image-modal');
      if (modalElement) {
        (modalElement as HTMLElement).focus();
      }
    });
  }

  nextImage() {
    if (this.selectedInsumo && this.currentImageIndex < this.selectedInsumo.enderecosImagens.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.selectedInsumo && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  closeImageModal() {
    this.showImageModal = false;
    this.selectedInsumo = null;
    this.currentImageIndex = 0;
    this.showHint = false;
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }

  toggleHint() {
    this.showHint = !this.showHint;
    event?.stopPropagation();
    setTimeout(() => {
      this.showHint = false;
    }, 2000);
  }
}
