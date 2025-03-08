import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from '../../../models/pedido/pedido';
import { Insumo } from '../../../models/pedido/insumo';
import { DataService } from '../../../services/data.service';
import { OrdemDeServico } from '../../../models/ordem-de-servico/ordem-de-servico';
import { DatepickerComponent } from '../../../components/datepicker/datepicker.component';

@Component({
  selector: 'app-pedido-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatepickerComponent],
  templateUrl: './pedido-novo.component.html',
  styleUrls: ['./pedido-novo.component.css', '../../../../styles/shared-buttons.css']
})
export class PedidoNovoComponent implements OnInit {
  pedido: Pedido = new Pedido();
  insumosDisponiveis: Insumo[] = [];
  insumoSelecionado: Insumo | null = null;
  ordensDisponiveis: OrdemDeServico[] = [];
  enderecos: string[] = ['Almoxarifado Central', 'Setor de Manutenção', 'Depósito 1', 'Depósito 2'];
  formErrors: { [key: string]: string } = {};
  showErrorModal = false;
  errorMessage = '';
  categorias = ['Material de Construção', 'Material Elétrico', 'Material Hidráulico', 'Ferramentas', 'EPI', 'Material de Escritório'];
  prioridades = ['Baixa', 'Média', 'Alta', 'Urgente'];
  insumoAtual: Insumo | null = null;
  quantidade: number = 1;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.initializePedido();
  }

  ngOnInit() {
    this.loadData();
  }

  private initializePedido() {
    const nextId = Math.max(...this.dataService.getPedidos().map(p => p.id), 0) + 1;
    this.pedido = {
      id: nextId,
      numero: `PED${nextId.toString().padStart(6, '0')}`,
      descricao: '',
      insumos: [],
      valorTotal: 0,
      status: 'Pendente',
      dataPedido: new Date(),
      dataEntrega: new Date(),
      enderecoEntrega: '',
      OSVinculada: null,
      paraEstoque: false,
      atendido: false,
      solicitante: '',
      categoria: '',
      prioridade: 'Média',
      observacoes: ''
    };
  }

  private loadData() {
    this.insumosDisponiveis = this.dataService.getInsumos();
    this.ordensDisponiveis = this.dataService.getOrdens()
      .filter(os => os.status !== 'Concluída');
  }

  onInsumoSelect(insumo: Insumo | null) {
    if (insumo && !this.pedido.insumos.some(i => i.id === insumo.id)) {
      this.quantidade = 1;
    } else if (insumo) {
      this.showError('Este insumo já foi adicionado ao pedido');
      this.insumoSelecionado = null;
      this.quantidade = 1;
    }
  }

  adicionarInsumo() {
    if (this.validateInsumo()) {
      const novoInsumo = {
        ...this.insumoSelecionado!,
        quantidade: this.quantidade
      };
      this.pedido.insumos.push(novoInsumo);
      this.calcularTotal();
      this.insumoSelecionado = null;
      this.quantidade = 1;
    }
  }

  removerInsumo(index: number) {
    this.pedido.insumos.splice(index, 1);
    this.calcularTotal();
  }

  private calcularTotal() {
    this.pedido.valorTotal = this.pedido.insumos.reduce(
      (total, insumo) => total + (insumo.valorUnitario * insumo.quantidade),
      0
    );
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

  private validateForm(): boolean {
    this.formErrors = {};
    
    if (!this.pedido.descricao?.trim()) {
      this.formErrors['descricao'] = 'Descrição é obrigatória';
    }
    if (!this.pedido.enderecoEntrega) {
      this.formErrors['enderecoEntrega'] = 'Local de entrega é obrigatório';
    }
    if (!this.pedido.dataEntrega) {
      this.formErrors['dataEntrega'] = 'Data de entrega é obrigatória';
    }
    if (!this.pedido.solicitante?.trim()) {
      this.formErrors['solicitante'] = 'Solicitante é obrigatório';
    }
    if (!this.pedido.categoria) {
      this.formErrors['categoria'] = 'Categoria é obrigatória';
    }
    if (!this.pedido.insumos.length) {
      this.formErrors['insumos'] = 'Adicione pelo menos um insumo';
    }
    if (this.pedido.dataEntrega < new Date()) {
      this.formErrors['dataEntrega'] = 'Data de entrega não pode ser anterior à data atual';
    }

    return Object.keys(this.formErrors).length === 0;
  }

  onSubmit() {
    if (this.validateForm()) {
      // TODO: Implement save logic
      this.router.navigate(['/dashboard/pedidos']);
    } else {
      const errors = Object.values(this.formErrors).join('\n');
      this.showError(`Corrija os seguintes erros:\n${errors}`);
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/pedidos']);
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  onCloseError() {
    this.showErrorModal = false;
    this.errorMessage = '';
  }
}
