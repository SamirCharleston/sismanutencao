import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';

@Component({
  selector: 'app-ordem-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          <button *ngIf="isEditing" class="control-btn cancel" (click)="onCancel()">
            <i class="material-icons">cancel</i>
            <span>Cancelar</span>
          </button>
          <button class="control-btn delete" (click)="onDelete()">
            <i class="material-icons">delete</i>
            <span>Apagar</span>
          </button>
          <button class="control-btn review" (click)="onReview()">
            <i class="material-icons">rate_review</i>
            <span>Revisar</span>
          </button>
          <button class="control-btn complete" (click)="onComplete()" [disabled]="ordem.status === 'Concluída'">
            <i class="material-icons">check_circle</i>
            <span>Concluir</span>
          </button>
          <button class="control-btn print" (click)="onPrint()">
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

        <div class="info-section full-width">
          <h3>Itens Utilizados</h3>
          <div class="items-table">
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Unidade</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of ordem.itens">
                  <td>{{item.descricao}}</td>
                  <td>{{item.unidade}}</td>
                  <td>{{item.quantidade}}</td>
                  <td>{{item.valorUnitario | currency:'BRL'}}</td>
                  <td>{{item.quantidade * item.valorUnitario | currency:'BRL'}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ordem-detalhes.component.css']
})
export class OrdemDetalhesComponent implements OnInit {
  ordem: OrdemDeServico | undefined;
  isEditing = false;
  private originalOrdem: OrdemDeServico | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ordens = this.dataService.getOrdens();
      this.ordem = ordens.find(o => o.numero === params['numero']);
    });
  }

  onEdit() {
    this.isEditing = true;
    // this.originalOrdem = { ...this.ordem, id: this.ordem?.id ?? 0, numero: this.ordem?.numero ?? '' };
  }

  onSave() {
    if (confirm('Deseja salvar as alterações?')) {
      this.isEditing = false;
      console.log('Salvando alterações:', this.ordem);
      // Aqui você implementaria a lógica para salvar no backend
    }
  }

  onCancel() {
    if (confirm('Deseja cancelar as alterações?')) {
      // this.ordem = { ...this.originalOrdem, id: this.originalOrdem?.id ?? 0 };
      this.isEditing = false;
    }
  }

  onDelete() {
    if (confirm(`Tem certeza que deseja excluir a OS ${this.ordem?.numero}?`)) {
      console.log('Excluir OS:', this.ordem?.numero);
    }
  }

  onReview() {
    console.log('Revisar OS:', this.ordem?.numero);
  }

  onComplete() {
    if (this.ordem && this.ordem.status !== 'Concluída') {
      if (confirm(`Deseja marcar a OS ${this.ordem.numero} como concluída?`)) {
        console.log('Concluir OS:', this.ordem.numero);
      }
    }
  }

  onPrint() {
    console.log('Imprimir OS:', this.ordem?.numero);
    window.print();
  }
}
