import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Colaborador } from '../../../models/colaborador/colaborador';
import { DataService } from '../../../services/data.service';
import { DatepickerComponent } from '../../../components/datepicker/datepicker.component';
import { AlertModalComponent } from '../../../components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-colaborador-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatepickerComponent, AlertModalComponent],
  templateUrl: './colaborador-novo.component.html',
  styleUrls: ['./colaborador-novo.component.css']
})
export class ColaboradorNovoComponent {
  colaborador: Colaborador = new Colaborador();
  showAlertModal = false;
  alertMessage = '';
  alertTitle = 'Atenção';
  formErrors: { [key: string]: string } = {};

  statusOptions: string[] = ['Ativo', 'Inativo', 'Férias', 'Licença', 'Desligado'];
  cargos = ['Técnico', 'Engenheiro', 'Supervisor', 'Analista', 'Assistente'];
  setores = ['Manutenção', 'Projetos', 'Qualidade', 'Operações', 'Administrativo'];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.colaborador.status = 'Ativo';
    this.colaborador.dataAdmissao = new Date();
  }

  onSubmit() {
    if (this.validateForm()) {
      try {
        // Aqui seria a integração com o backend
        console.log('Novo colaborador:', this.colaborador);
        this.showAlert('Colaborador registrado com sucesso!', 'Sucesso');
        setTimeout(() => this.router.navigate(['/dashboard/colaboradores']), 1500);
      } catch (error) {
        this.showAlert('Erro ao registrar colaborador');
      }
    }
  }

  private validateForm(): boolean {
    this.formErrors = {};
    
    if (!this.colaborador.nome?.trim()) {
      this.formErrors['nome'] = 'Nome é obrigatório';
    }
    if (!this.colaborador.matricula?.trim()) {
      this.formErrors['matricula'] = 'Matrícula é obrigatória';
    }
    if (!this.colaborador.cargo) {
      this.formErrors['cargo'] = 'Cargo é obrigatório';
    }
    if (!this.colaborador.setor) {
      this.formErrors['setor'] = 'Setor é obrigatório';
    }
    if (!this.colaborador.dataAdmissao) {
      this.formErrors['dataAdmissao'] = 'Data de admissão é obrigatória';
    }

    return Object.keys(this.formErrors).length === 0;
  }

  onCancel() {
    this.router.navigate(['/dashboard/colaboradores']);
  }

  onChangePhoto() {
    // Implementar lógica para upload de foto
    console.log('Alterar foto');
  }

  getDefaultImage(): string {
    return 'assets/images/default-profile.png';
  }

  private showAlert(message: string, title: string = 'Atenção') {
    this.alertMessage = message;
    this.alertTitle = title;
    this.showAlertModal = true;
  }

  onCloseAlert() {
    this.showAlertModal = false;
  }
}
