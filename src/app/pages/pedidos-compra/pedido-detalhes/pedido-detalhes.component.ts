import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../../models/pedido/pedido';
import { DataService } from '../../../services/data.service';
import { Insumo } from '../../../models/pedido/insumo';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { OrdemDeServico } from '../../../models/ordem-de-servico/ordem-de-servico';
import { DatepickerComponent } from '../../../components/datepicker/datepicker.component';
import { AlertModalComponent } from '../../../components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ConfirmModalComponent, 
    DatepickerComponent,
    AlertModalComponent
  ],
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
  showConfirmModal = false;
  isEditing = false;
  originalPedido: Pedido | null = null;
  formErrors: { [key: string]: string } = {};
  showErrorModal = false;
  errorMessage = '';
  categorias = ['Material de Construção', 'Material Elétrico', 'Material Hidráulico', 'Ferramentas', 'EPI', 'Material de Escritório'];
  prioridades = ['Baixa', 'Média', 'Alta', 'Urgente'];
  enderecos = ['Almoxarifado Central', 'Setor de Manutenção', 'Depósito 1', 'Depósito 2'];
  insumoSelecionado: Insumo | null = null;
  quantidade: number = 1;
  insumosDisponiveis: Insumo[] = [];
  ordensDisponiveis: OrdemDeServico[] = [];
  showAlertModal = false;
  alertMessage = '';
  alertTitle = 'Atenção';

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
    this.isEditing = true;
    this.originalPedido = { ...this.pedido! };
    this.loadData();
  }

  private loadData() {
    this.insumosDisponiveis = this.dataService.getInsumos();
    this.ordensDisponiveis = this.dataService.getOrdensDisponiveis();
  }

  cancelEdit() {
    if (confirm('Tem certeza que deseja cancelar a edição? Todas as alterações serão perdidas.')) {
      if (this.originalPedido) {
      }
      this.pedido = this.originalPedido;
      this.isEditing = false;
      this.originalPedido = null;
    }
  }

  onSave() {
    if (this.validateForm()) {
      try {
        // Atualiza os valores
        if (this.pedido) {
          this.pedido.valorTotal = this.pedido.insumos.reduce(
            (total, insumo) => total + (insumo.valorUnitario * insumo.quantidade),
            0
          );
          
          // Aqui você implementaria a lógica real de salvamento no backend
          console.log('Pedido atualizado:', this.pedido);
          
          this.isEditing = false;
          this.originalPedido = null;
          this.showError('Pedido atualizado com sucesso!');
        }
      } catch (error) {
        this.showError('Erro ao salvar o pedido.');
        console.error('Erro ao salvar:', error);
      }
    }
  }

  private validateForm(): boolean {
    this.formErrors = {};
    
    if (!this.pedido?.descricao?.trim()) {
      this.formErrors['descricao'] = 'Descrição é obrigatória';
    }
    if (!this.pedido?.enderecoEntrega) {
      this.formErrors['enderecoEntrega'] = 'Local de entrega é obrigatório';
    }
    if (!this.pedido?.dataEntrega) {
      this.formErrors['dataEntrega'] = 'Data de entrega é obrigatória';
    }
    if (!this.pedido?.solicitante?.trim()) {
      this.formErrors['solicitante'] = 'Solicitante é obrigatório';
    }
    if (!this.pedido?.categoria) {
      this.formErrors['categoria'] = 'Categoria é obrigatória';
    }
    if (!this.pedido?.insumos.length) {
      this.formErrors['insumos'] = 'Adicione pelo menos um insumo';
    }

    return Object.keys(this.formErrors).length === 0;
  }

  onInsumoSelect(insumo: Insumo | null) {
    if (insumo && !this.pedido?.insumos.some(i => i.id === insumo.id)) {
      this.quantidade = 1;
      this.insumoSelecionado = insumo;
    } else {
      this.showError('Este insumo já foi adicionado ao pedido');
      this.insumoSelecionado = null;
      this.quantidade = 1;
    }
  }

  adicionarInsumo() {
    if (this.validateInsumo()) {
      const novoInsumo = { ...this.insumoSelecionado!, quantidade: this.quantidade };
      this.pedido?.insumos.push(novoInsumo);
      this.insumoSelecionado = null;
      this.quantidade = 1;
    }
  }

  private validateInsumo(): boolean {
    if (!this.insumoSelecionado) {
      this.showError('Selecione um insumo');
      return false;
    }
    if (!this.quantidade || this.quantidade <= 0) {
      this.showError('Quantidade deve ser maior que zero');
      return false;
    }
    return true;
  }

  private showError(message: string, title: string = 'Atenção') {
    this.alertMessage = message;
    this.alertTitle = title;
    this.showAlertModal = true;
  }

  onCloseAlert() {
    this.showAlertModal = false;
    this.alertMessage = '';
    this.alertTitle = 'Atenção';
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isEditing) {
      $event.returnValue = true;
    }
  }

  onDelete() {
    this.showConfirmModal = true;
  } 

  onCancelDelete(){
    this.showConfirmModal = false;
  }

  onConfirmDelete() {
    if (this.pedido) {
      // TODO: Implement actual delete logic
      this.router.navigate(['/dashboard/pedidos']);
    }
    this.showConfirmModal = false;
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

  removerInsumo(index: number) {
    if (this.pedido && this.isEditing) {
      if (confirm('Tem certeza que deseja remover este insumo?')) {
        this.pedido.insumos.splice(index, 1);
        this.calcularTotal();
      }
    }
  }

  private calcularTotal() {
    if (this.pedido) {
      this.pedido.valorTotal = this.pedido.insumos.reduce(
        (total, insumo) => total + (insumo.valorUnitario * insumo.quantidade),
        0
      );
    }
  }

  onQuantidadeChange() {
    // Recalcula o valor total sempre que uma quantidade for alterada
    this.calcularTotal();
  }
}
