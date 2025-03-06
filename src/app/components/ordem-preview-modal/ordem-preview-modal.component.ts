import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';

@Component({
  selector: 'app-ordem-preview-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="show" (click)="onOverlayClick($event)">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Ordem de Serviço #{{ordem?.numero}}</h3>
          <button class="btn-close" (click)="close()">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-content">
          <div class="ordem-info">
            <div class="info-section">
              <h4>Informações Gerais</h4>
              <div class="info-grid">
                <div class="info-item">
                  <label>Status:</label>
                  <span class="status-badge" [class]="ordem?.status?.toLowerCase()">
                    {{ordem?.status}}
                  </span>
                </div>
                <div class="info-item">
                  <label>GLPI:</label>
                  <span>{{ordem?.glpi}}</span>
                </div>
                <div class="info-item">
                  <label>Fiscal:</label>
                  <span>{{ordem?.fiscal}}</span>
                </div>
                <div class="info-item">
                  <label>Local:</label>
                  <span>{{ordem?.local}}</span>
                </div>
                <div class="info-item">
                  <label>Área Solicitante:</label>
                  <span>{{ordem?.areaSolicitante}}</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <h4>Datas</h4>
              <div class="info-grid">
                <div class="info-item">
                  <label>Início:</label>
                  <span>{{ordem?.dataInicio | date:'dd/MM/yyyy'}}</span>
                </div>
                <div class="info-item">
                  <label>Fim Previsto:</label>
                  <span>{{ordem?.dataFim | date:'dd/MM/yyyy'}}</span>
                </div>
                <div class="info-item" *ngIf="ordem?.dataConclusao">
                  <label>Conclusão:</label>
                  <span>{{ordem?.dataConclusao | date:'dd/MM/yyyy'}}</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <h4>Valores</h4>
              <div class="info-grid">
                <div class="info-item">
                  <label>Valor Inicial:</label>
                  <span>{{ordem?.valorInicial | currency:'BRL'}}</span>
                </div>
                <div class="info-item">
                  <label>Valor Final:</label>
                  <span>{{ordem?.valorFinal | currency:'BRL'}}</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <h4>Descrição do Serviço</h4>
              <p class="descricao">{{ordem?.descricaoServico}}</p>
            </div>

            <div class="info-section">
              <h4>Itens Utilizados</h4>
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
                    <tr *ngFor="let item of ordem?.itens">
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
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999; /* Increased z-index to be above header */
      padding: 2rem;
    }

    .modal-container {
      background: white;
      border-radius: 8px;
      width: 100%;
      max-width: 900px;
      max-height: 80vh; 
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      border-radius: 8px 8px 0 0;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .modal-content {
      padding: 1.5rem;
      overflow-y: auto;
    }

    .btn-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .btn-close:hover {
      background: #f0f0f0;
      color: #333;
    }

    .info-section {
      margin-bottom: 2rem;
      background: #f8f8f8;
      padding: 1rem;
      border-radius: 6px;
    }

    .info-section h4 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-item label {
      color: #666;
      font-size: 0.9rem;
    }

    .info-item span {
      font-weight: 500;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-badge.concluída { background: #e6ffe6; color: #008000; }
    .status-badge.pendente { background: #fff3e6; color: #cc7700; }
    .status-badge.em.andamento { background: #e6f3ff; color: #0066cc; }
    .status-badge.em.análise { background: #f2e6ff; color: #6600cc; }
    .status-badge.atrasada { background: #ffe6e6; color: #cc0000; }

    .items-table {
      overflow-x: auto;
      margin-top: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: white;
      font-weight: 500;
      color: #666;
    }

    tr:hover {
      background: white;
    }

    .descricao {
      margin: 0;
      line-height: 1.6;
      color: #444;
    }

    @media (max-width: 768px) {
      .modal-overlay {
        padding: 1rem;
      }

      .modal-container {
        max-height: 95vh;
      }
    }
  `]
})
export class OrdemPreviewModalComponent implements OnInit, OnDestroy {
  @Input() ordem: OrdemDeServico | undefined;
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit() {
    this.watchShowState();
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  private watchShowState() {
    if (this.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  @Input() set show(value: boolean) {
    this._show = value;
    this.watchShowState();
  }
  get show(): boolean {
    return this._show;
  }
  private _show = false;

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
