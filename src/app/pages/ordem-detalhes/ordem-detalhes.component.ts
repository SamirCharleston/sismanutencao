import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';

@Component({
  selector: 'app-ordem-detalhes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ordem-container" *ngIf="ordem">
      <div class="ordem-header">
        <div class="header-left">
          <h2>Ordem de Serviço #{{ordem.numero}}</h2>
          <span class="status-badge" [class]="ordem.status.toLowerCase()">
            {{ordem.status}}
          </span>
        </div>
        
        <div class="control-panel">
          <button class="control-btn edit" (click)="onEdit()">
            <i class="material-icons">edit</i>
            <span>Editar</span>
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
              <span>{{ordem.glpi}}</span>
            </div>
            <div class="info-item">
              <label>Fiscal:</label>
              <span>{{ordem.fiscal}}</span>
            </div>
            <div class="info-item">
              <label>Local:</label>
              <span>{{ordem.local}}</span>
            </div>
            <div class="info-item">
              <label>Área Solicitante:</label>
              <span>{{ordem.areaSolicitante}}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Datas</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Início:</label>
              <span>{{ordem.dataInicio | date:'dd/MM/yyyy'}}</span>
            </div>
            <div class="info-item">
              <label>Fim Previsto:</label>
              <span>{{ordem.dataFim | date:'dd/MM/yyyy'}}</span>
            </div>
            <div class="info-item" *ngIf="ordem.dataConclusao">
              <label>Conclusão:</label>
              <span>{{ordem.dataConclusao | date:'dd/MM/yyyy'}}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Valores</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Valor Inicial:</label>
              <span>{{ordem.valorInicial | currency:'BRL'}}</span>
            </div>
            <div class="info-item">
              <label>Valor Final:</label>
              <span>{{ordem.valorFinal | currency:'BRL'}}</span>
            </div>
          </div>
        </div>

        <div class="info-section full-width">
          <h3>Descrição do Serviço</h3>
          <p class="descricao">{{ordem.descricaoServico}}</p>
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
    console.log('Editar OS:', this.ordem?.numero);
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
