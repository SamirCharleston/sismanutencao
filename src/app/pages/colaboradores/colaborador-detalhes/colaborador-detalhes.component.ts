import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Colaborador } from '../../../models/colaborador/colaborador';
import { DataService } from '../../../services/data.service';
import { DatepickerComponent } from '../../../components/datepicker/datepicker.component';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-colaborador-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule, DatepickerComponent, ConfirmModalComponent, AlertModalComponent],
  templateUrl: './colaborador-detalhes.component.html',
  styleUrls: ['./colaborador-detalhes.component.css']
})
export class ColaboradorDetalhesComponent implements OnInit {
  colaborador: Colaborador | null = null;
  isEditing = false;
  originalColaborador: Colaborador | null = null;
  showConfirmModal = false;
  showConfirmSaveModal = false;
  showConfirmCancelModal = false;
  showAlertModal = false;
  alertMessage = '';
  alertTitle = 'Atenção';

  statusOptions: string[] = ['Ativo', 'Inativo', 'Férias', 'Licença', 'Desligado'];
  cargos = ['Técnico', 'Engenheiro', 'Supervisor', 'Analista', 'Assistente'];
  setores = ['Manutenção', 'Projetos', 'Qualidade', 'Operações', 'Administrativo'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadColaborador(id);
  }

  private loadColaborador(id: number) {
    const colaborador = this.dataService.getColaboradores().find(c => c.id === id);
    if (colaborador) {
      this.colaborador = colaborador;
    } else {
      this.router.navigate(['/dashboard/colaboradores']);
    }
  }

  onEdit() {
    this.isEditing = true;
    this.originalColaborador = JSON.parse(JSON.stringify(this.colaborador));
  }

  onSave() {
    if (this.validateForm()) {
      this.showConfirmSaveModal = true;
    }
  }

  onConfirmSave() {
    if (this.colaborador) {
      // Aqui seria implementada a lógica real de salvamento
      console.log('Colaborador atualizado:', this.colaborador);
      this.showConfirmSaveModal = false;
      this.isEditing = false;
      this.originalColaborador = null;
      this.showAlert('Colaborador atualizado com sucesso!', 'Sucesso');
    }
  }

  onCancelSave() {
    this.showConfirmSaveModal = false;
  }

  private validateForm(): boolean {
    // Implementar validação do formulário
    return true;
  }

  cancelEdit() {
    if (this.hasChanges()) {
      this.showConfirmCancelModal = true;
    } else {
      this.confirmCancel();
    }
  }

  private hasChanges(): boolean {
    if (!this.originalColaborador || !this.colaborador) return false;
    return JSON.stringify(this.originalColaborador) !== JSON.stringify(this.colaborador);
  }

  onConfirmCancel() {
    this.confirmCancel();
    this.showConfirmCancelModal = false;
  }

  onCancelCancel() {
    this.showConfirmCancelModal = false;
  }

  private confirmCancel() {
    if (this.originalColaborador) {
      this.colaborador = JSON.parse(JSON.stringify(this.originalColaborador));
    }
    this.isEditing = false;
    this.originalColaborador = null;
  }

  onDelete() {
    this.showConfirmModal = true;
  }

  onConfirmDelete() {
    // Implementar lógica de exclusão
    this.router.navigate(['/dashboard/colaboradores']);
    this.showConfirmModal = false;
  }

  onCancelDelete() {
    this.showConfirmModal = false;
  }

  onBack() {
    this.router.navigate(['/dashboard/colaboradores']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  private showAlert(message: string, title: string = 'Atenção') {
    this.alertMessage = message;
    this.alertTitle = title;
    this.showAlertModal = true;
  }

  onCloseAlert() {
    this.showAlertModal = false;
  }

  getStatusClass(status: string): string {
    const statusColors = {
      'Ativo': 'status-completed',
      'Inativo': 'status-cancelled',
      'Férias': 'status-pending',
      'Licença': 'status-progress',
      'Desligado': 'status-cancelled'
    };
    return statusColors[status as keyof typeof statusColors] || 'status-default';
  }

  getDefaultImage(): string {
    return 'assets/images/default-profile.png';
  }

  onChangePhoto() {
    // Implementar lógica para alterar foto
    console.log('Alterar foto');
  }
}
