import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Ferramenta } from '../../models/ferramenta/ferramenta';
import { Colaborador } from '../../models/colaborador/colaborador';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="modal-overlay" *ngIf="show" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Retirar Ferramenta</h3>
          <button class="btn-close" (click)="onClose()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="modal-body">
          <div class="tool-info">
            <h4>{{ferramenta?.nome}}</h4>
            <p>Disponível: {{ferramenta?.quantidade}} unidades</p>
          </div>

          <div class="form-group">
            <label>Colaborador</label>
            <select [(ngModel)]="selectedColaborador" class="form-control">
              <option [ngValue]="null">Selecione o colaborador</option>
              <option *ngFor="let colab of colaboradores" [ngValue]="colab">
                {{colab.nome}} - {{colab.cargo}}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Quantidade</label>
            <input type="number" 
                   [(ngModel)]="quantidade" 
                   [max]="ferramenta?.quantidade ?? 0"
                   min="1"
                   class="form-control">
          </div>

          <div class="form-group">
            <label>Observações</label>
            <textarea [(ngModel)]="observacoes" 
                     class="form-control"
                     rows="3"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="onClose()">Cancelar</button>
          <button class="btn btn-primary" 
                  (click)="onConfirm()"
                  [disabled]="!isValid">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent {
  @Input() show = false;
  @Input() ferramenta?: Ferramenta;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{
    colaborador: Colaborador;
    quantidade: number;
    observacoes: string;
  }>();

  colaboradores: Colaborador[] = [];
  selectedColaborador: Colaborador | null = null;
  quantidade = 1;
  observacoes = '';

  constructor(private dataService: DataService) {
    this.colaboradores = this.dataService.getColaboradores();
  }

  get isValid(): boolean {
    return !!this.selectedColaborador && 
           this.quantidade > 0 && 
           this.quantidade <= (this.ferramenta?.quantidade || 0);
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onConfirm() {
    if (this.isValid && this.selectedColaborador) {
      this.confirm.emit({
        colaborador: this.selectedColaborador,
        quantidade: this.quantidade,
        observacoes: this.observacoes
      });
      this.resetForm();
    }
  }

  private resetForm() {
    this.selectedColaborador = null;
    this.quantidade = 1;
    this.observacoes = '';
  }
}
