import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Medicao } from '../../models/medicao/medicao';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { OrdemPreviewModalComponent } from '../../components/ordem-preview-modal/ordem-preview-modal.component';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';

@Component({
  selector: 'app-medicao-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent, OrdemPreviewModalComponent],
  templateUrl: './medicao-detalhes.component.html',
  styleUrls: ['./medicao-detalhes.component.css']
})
export class MedicaoDetalhesComponent implements OnInit {
  medicao: Medicao | undefined;
  isEditing = false;
  showConfirmModal = false;
  modalTitle = '';
  modalMessage = '';
  modalConfirmText = '';
  private originalMedicao: Medicao | undefined;
  private modalAction: (() => void) | null = null;
  selectedOS: OrdemDeServico | undefined;
  showOSModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const medicoes = this.dataService.getMedicoes();
      this.medicao = medicoes.find(m => m.numero === +params['numero']);
      if (!this.medicao) {
        this.router.navigate(['/dashboard/medicoes']);
      }
    });
  }

  getMesAno(data: Date): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const dataObj = new Date(data);
    return `${meses[dataObj.getMonth()]} de ${dataObj.getFullYear()}`;
  }

  onEdit() {
    this.isEditing = true;
    this.originalMedicao = { ...this.medicao! };
  }

  onSave() {
    this.showConfirmModal = true;
    this.modalTitle = 'Salvar Alterações';
    this.modalMessage = 'Deseja salvar as alterações desta medição?';
    this.modalConfirmText = 'Salvar';
    this.modalAction = () => {
      this.isEditing = false;
      console.log('Salvando medição:', this.medicao);
      // Implementar lógica de salvamento
    };
  }

  onCancel() {
    this.showConfirmModal = true;
    this.modalTitle = 'Cancelar Edição';
    this.modalMessage = 'Deseja cancelar as alterações?';
    this.modalConfirmText = 'Confirmar';
    this.modalAction = () => {
      this.medicao = { ...this.originalMedicao! };
      this.isEditing = false;
    };
  }

  onDelete() {
    this.showConfirmModal = true;
    this.modalTitle = 'Excluir Medição';
    this.modalMessage = `Tem certeza que deseja excluir a medição ${this.medicao?.numero}?`;
    this.modalConfirmText = 'Excluir';
    this.modalAction = () => {
      console.log('Excluindo medição:', this.medicao?.numero);
      this.router.navigate(['/dashboard/medicoes']);
    };
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

  onPrint() {
    window.print();
  }

  openOSPreview(os: OrdemDeServico) {
    this.selectedOS = os;
    this.showOSModal = true;
  }

  closeOSModal() {
    this.showOSModal = false;
    this.selectedOS = undefined;
  }
}
