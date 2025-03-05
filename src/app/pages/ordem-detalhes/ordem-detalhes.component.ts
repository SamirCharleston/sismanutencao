import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { Item } from '../../models/ordem-de-servico/item';

@Component({
  selector: 'app-ordem-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  template: `
    <div class="ordem-container" *ngIf="ordem">
      <div class="ordem-header">
        <div class="header-left">
          <h2>Ordem de Serviço #{{ordem.numero}}</h2>
          <span class="status-badge" [class]="ordem.status.toLowerCase()">
            <span *ngIf="!isEditing">{{ordem.status}}</span>
            <select *ngIf="isEditing" [(ngModel)]="ordem.status">
              <option value="Em andamento">Em andamento</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluída">Concluída</option>
              <option value="Em análise">Em análise</option>
              <option value="Atrasada">Atrasada</option>
            </select>
          </span>
        </div>
        
        <div class="control-panel">
          <button *ngIf="!isEditing" class="control-btn edit" (click)="onEdit()">
            <i class="material-icons">edit</i>
            <span>Editar</span>
          </button>
          <button *ngIf="isEditing" class="control-btn save" (click)="onSave()">
            <i class="material-icons">save</i>
            <span>Salvar</span>
          </button>
          <button *ngIf="isEditing" class="control-btn delete" (click)="onCancel()">
            <i class="material-icons">cancel</i>
            <span>Cancelar</span>
          </button>
          <button *ngIf="!isEditing" class="control-btn delete" (click)="onDelete()">
            <i class="material-icons">delete</i>
            <span>Apagar</span>
          </button>
          <button *ngIf="!isEditing" class="control-btn review" (click)="onReview()">
            <i class="material-icons">rate_review</i>
            <span>Revisar</span>
          </button>
          <button *ngIf="!isEditing" class="control-btn complete" (click)="onComplete()" [disabled]="ordem.status === 'Concluída'">
            <i class="material-icons">check_circle</i>
            <span>Concluir</span>
          </button>
          <button *ngIf="!isEditing" class="control-btn print" (click)="onPrint()">
            <i class="material-icons">print</i>
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      <div class="ordem-grid">
        <div class="info-section">
          <h3>Informações Gerais</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>GLPI:</label>
              <span *ngIf="!isEditing">{{ordem.glpi}}</span>
              <input *ngIf="isEditing" type="number" [(ngModel)]="ordem.glpi">
            </div>
            <div class="info-item">
              <label>Fiscal:</label>
              <span *ngIf="!isEditing">{{ordem.fiscal}}</span>
              <input *ngIf="isEditing" type="text" [(ngModel)]="ordem.fiscal">
            </div>
            <div class="info-item">
              <label>Local:</label>
              <span *ngIf="!isEditing">{{ordem.local}}</span>
              <input *ngIf="isEditing" type="text" [(ngModel)]="ordem.local">
            </div>
            <div class="info-item">
              <label>Área Solicitante:</label>
              <span *ngIf="!isEditing">{{ordem.areaSolicitante}}</span>
              <input *ngIf="isEditing" type="text" [(ngModel)]="ordem.areaSolicitante">
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Datas</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Início:</label>
              <span *ngIf="!isEditing">{{ordem.dataInicio | date:'dd/MM/yyyy'}}</span>
              <input *ngIf="isEditing" type="date" [(ngModel)]="ordem.dataInicio">
            </div>
            <div class="info-item">
              <label>Fim Previsto:</label>
              <span *ngIf="!isEditing">{{ordem.dataFim | date:'dd/MM/yyyy'}}</span>
              <input *ngIf="isEditing" type="date" [(ngModel)]="ordem.dataFim">
            </div>
            <div class="info-item" *ngIf="ordem.dataConclusao">
              <label>Conclusão:</label>
              <span *ngIf="!isEditing">{{ordem.dataConclusao | date:'dd/MM/yyyy'}}</span>
              <input *ngIf="isEditing" type="date" [(ngModel)]="ordem.dataConclusao">
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Valores</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Valor Inicial:</label>
              <span *ngIf="!isEditing">{{ordem.valorInicial | currency:'BRL'}}</span>
              <input *ngIf="isEditing" type="number" step="0.01" [(ngModel)]="ordem.valorInicial">
            </div>
            <div class="info-item">
              <label>Valor Final:</label>
              <span *ngIf="!isEditing">{{ordem.valorFinal | currency:'BRL'}}</span>
              <input *ngIf="isEditing" type="number" step="0.01" [(ngModel)]="ordem.valorFinal">
            </div>
          </div>
        </div>

        <div class="info-section full-width">
          <h3>Descrição do Serviço</h3>
          <p *ngIf="!isEditing" class="descricao">{{ordem.descricaoServico}}</p>
          <textarea *ngIf="isEditing" [(ngModel)]="ordem.descricaoServico" rows="4"></textarea>
        </div>

        <div id="itens-utilizados" class="info-section full-width">
          <div class="section-header">
            <div class="header-left">
              <h3>Itens Utilizados</h3>
              <div class="filters-container">
                <div class="filter-item" *ngFor="let field of sortFields" (click)="sortItems(field.value)">
                  <span>{{field.label}}</span>
                  <i class="material-icons">{{getSortIcon(field.value)}}</i>
                </div>
              </div>
            </div>
            <button *ngIf="isEditing" class="btn-add" (click)="addItem()">
              <i class="material-icons">add</i>
              Adicionar Item
            </button>
          </div>

          <div class="items-table">
            <table>
              <thead>
                <tr>
                  <th>
                    <div class="header-content">
                      <span>Descrição</span>
                    </div>
                  </th>
                  <th>
                    <div class="header-content">
                      <span>Unidade</span>
                    </div>
                  </th>
                  <th>
                    <div class="header-content">
                      <span>Quantidade</span>
                    </div>
                  </th>
                  <th>
                    <div class="header-content">
                      <span>Valor Unitário</span>
                    </div>
                  </th>
                  <th>
                    <div class="header-content">
                      <span>Total</span>
                    </div>
                  </th>
                  <th *ngIf="isEditing">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of ordem.itens; let i = index">
                  <ng-container *ngIf="editingItemIndex !== i; else editRow">
                    <td>{{item.descricao}}</td>
                    <td>{{item.unidade}}</td>
                    <td>{{item.quantidade}}</td>
                    <td>{{item.valorUnitario | currency:'BRL'}}</td>
                    <td>{{item.quantidade * item.valorUnitario | currency:'BRL'}}</td>
                    <td *ngIf="isEditing" class="actions-cell">
                      <button class="btn-icon" (click)="editItem(i)">
                        <i class="material-icons">edit</i>
                      </button>
                      <button class="btn-icon delete" (click)="deleteItem(i)">
                        <i class="material-icons">delete</i>
                      </button>
                    </td>
                  </ng-container>
                  
                  <ng-template #editRow>
                    <td><input type="text" [(ngModel)]="editingItem!.descricao"></td>
                    <td><input type="text" [(ngModel)]="editingItem!.unidade"></td>
                    <td><input type="number" [(ngModel)]="editingItem!.quantidade" min="0"></td>
                    <td><input type="number" [(ngModel)]="editingItem!.valorUnitario" min="0" step="0.01"></td>
                    <td>{{editingItem!.quantidade * editingItem!.valorUnitario | currency:'BRL'}}</td>
                    <td class="actions-cell">
                      <button class="btn-icon" (click)="saveItem()">
                        <i class="material-icons">check</i>
                      </button>
                      <button class="btn-icon delete" (click)="cancelEditItem()">
                        <i class="material-icons">close</i>
                      </button>
                    </td>
                  </ng-template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <app-confirm-modal
      [show]="showConfirmModal"
      [title]="modalTitle"
      [message]="modalMessage"
      [confirmText]="modalConfirmText"
      (confirm)="onModalConfirm()"
      (cancel)="onModalCancel()">
    </app-confirm-modal>
  `,
  styleUrls: ['./ordem-detalhes.component.css']
})
export class OrdemDetalhesComponent implements OnInit {
  ordem: OrdemDeServico = new OrdemDeServico();
  isEditing = false;
  private originalOrdem: OrdemDeServico = new OrdemDeServico();
  showConfirmModal = false;
  modalTitle = '';
  modalMessage = '';
  modalConfirmText = '';
  private modalAction: (() => void) | null = null;
  editingItemIndex: number = -1;
  editingItem: Item | null = null;
  private currentSort = {
    column: '',
    direction: 'asc'
  };
  sortFields = [
    { label: 'Descrição', value: 'descricao' },
    { label: 'Unidade', value: 'unidade' },
    { label: 'Quantidade', value: 'quantidade' },
    { label: 'Valor Unit.', value: 'valorUnitario' },
    { label: 'Total', value: 'total' }
  ];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ordens = this.dataService.getOrdens();
      this.ordem = ordens.find(o => o.numero === params['numero']) as OrdemDeServico;
    });
  }

  onEdit() {
    this.isEditing = true;
    this.originalOrdem = { ...this.ordem, id: this.ordem?.id ?? 0 };
  }

  onSave() {
    this.showConfirmModal = true;
    this.modalTitle = 'Salvar Alterações';
    this.modalMessage = 'Deseja salvar as alterações?';
    this.modalConfirmText = 'Salvar';
    this.modalAction = () => {
      this.isEditing = false;
      console.log('Salvando alterações:', this.ordem);
      // Aqui você implementaria a lógica para salvar no backend
    };
  }

  onCancel() {
    this.ordem = { ...this.originalOrdem };
    this.isEditing = false;
  }

  onDelete() {
    this.showConfirmModal = true;
    this.modalTitle = 'Excluir Ordem de Serviço';
    this.modalMessage = `Tem certeza que deseja excluir a OS ${this.ordem?.numero}?`;
    this.modalConfirmText = 'Excluir';
    this.modalAction = () => {
      console.log('Excluir OS:', this.ordem?.numero);
      // Implement delete logic
    };
  }

  onReview() {
    console.log('Revisar OS:', this.ordem?.numero);
  }

  onComplete() {
    if (this.ordem && this.ordem.status !== 'Concluída') {
      this.showConfirmModal = true;
      this.modalTitle = 'Concluir Ordem de Serviço';
      this.modalMessage = `Tem certeza que deseja concluir a OS ${this.ordem.numero}?`;
      this.modalConfirmText = 'Concluir';
      this.modalAction = () => {
        // Quando a OS é concluída, a data de conclusão é preenchida
        this.ordem.dataConclusao = new Date();
        this.ordem.status = 'Concluída';
      };
    }
  }

  onPrint() {
    console.log('Imprimir OS:', this.ordem?.numero);
    window.print();
  }

  onModalConfirm() {
    if (this.modalAction) {
      this.modalAction();
    }
    this.showConfirmModal = false;
    this.modalAction = null;
  }

  onModalCancel() {
    this.showConfirmModal = false;
    this.modalAction = null;
  }

  addItem() {
    const newItem = {
      descricao: '',
      unidade: '',
      quantidade: 0,
      valorUnitario: 0
    } as Item;
    
    this.ordem.itens = [...this.ordem.itens, newItem];
    this.editItem(this.ordem.itens.length - 1);
  }

  editItem(index: number) {
    this.editingItemIndex = index;
    this.editingItem = { ...this.ordem.itens[index] };
  }

  saveItem() {
    if (this.editingItem && this.editingItemIndex >= 0) {
      this.ordem.itens[this.editingItemIndex] = { ...this.editingItem };
      this.cancelEditItem();
    }
  }

  cancelEditItem() {
    this.editingItemIndex = -1;
    this.editingItem = null;
  }

  deleteItem(index: number) {
    this.showConfirmModal = true;
    this.modalTitle = 'Excluir Item';
    this.modalMessage = 'Tem certeza que deseja excluir este item?';
    this.modalConfirmText = 'Excluir';
    this.modalAction = () => {
      this.ordem.itens = this.ordem.itens.filter((_, i) => i !== index);
    };
  }

  sortItems(column: string) {
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }

    const modifier = this.currentSort.direction === 'asc' ? 1 : -1;

    this.ordem.itens.sort((a, b) => {
      if (column === 'total') {
        const totalA = a.quantidade * a.valorUnitario;
        const totalB = b.quantidade * b.valorUnitario;
        return (totalA - totalB) * modifier;
      }

      const key = column as keyof Item;
      if (typeof a[key] === 'string') {
        return (a[key] as string).localeCompare(b[key] as string) * modifier;
      }

      return ((a[key] as number) - (b[key] as number)) * modifier;
    });
  }

  getSortIcon(column: string): string {
    if (this.currentSort.column !== column) {
      return 'unfold_more';
    }
    return this.currentSort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }
}
