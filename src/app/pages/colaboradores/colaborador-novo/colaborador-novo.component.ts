import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Colaborador } from '../../../models/colaborador/colaborador';
import { DataService } from '../../../services/data.service';
import { DatepickerComponent } from '../../../components/datepicker/datepicker.component';
import { AlertModalComponent } from '../../../components/alert-modal/alert-modal.component';
import { AppImageCropperComponent } from '../../../components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-colaborador-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, DatepickerComponent, AlertModalComponent, AppImageCropperComponent],
  templateUrl: './colaborador-novo.component.html',
  styleUrls: ['./colaborador-novo.component.css']
})
export class ColaboradorNovoComponent {
  colaborador: Colaborador = new Colaborador();
  showAlertModal = false;
  alertMessage = '';
  alertTitle = 'Atenção';
  formErrors: { [key: string]: string } = {};
  showImageCropper = false;
  selectedFile:  File | undefined = undefined;

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

  onStatusChange() {
    if (this.colaborador.status === 'Desligado') {
      this.colaborador.dataDesligamento = new Date();
    } else {
      this.colaborador.dataDesligamento = null as any;
      this.colaborador.motivoDesligamento = '';
    }
  }

  private validateForm(): boolean {
    this.formErrors = {};
    
    // Validações básicas
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
    if (!this.colaborador.dataNascimento) {
      this.formErrors['dataNascimento'] = 'Data de nascimento é obrigatória';
    }

    // Validações condicionais para desligamento
    if (this.colaborador.status === 'Desligado') {
      if (!this.colaborador.dataDesligamento) {
        this.formErrors['dataDesligamento'] = 'Data de desligamento é obrigatória';
      }
      if (!this.colaborador.motivoDesligamento?.trim()) {
        this.formErrors['motivoDesligamento'] = 'Motivo do desligamento é obrigatório';
      }
    }

    // Validações de email e telefone quando preenchidos
    if (this.colaborador.email && !this.isValidEmail(this.colaborador.email)) {
      this.formErrors['email'] = 'Email inválido';
    }
    if (this.colaborador.telefone && !this.isValidPhone(this.colaborador.telefone)) {
      this.formErrors['telefone'] = 'Telefone inválido';
    }

    return Object.keys(this.formErrors).length === 0;
  }

  private isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const re = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    return re.test(phone);
  }

  onCancel() {
    this.router.navigate(['/dashboard/colaboradores']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      // Validar tipo e tamanho do arquivo
      if (!file.type.startsWith('image/')) {
        this.showAlert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        this.showAlert('A imagem deve ter no máximo 5MB.');
        return;
      }

      this.selectedFile = file;
      this.showImageCropper = true;
    }
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    input.value = '';
  }

  onCropperClose() {
    this.showImageCropper = false;
    this.selectedFile = undefined;
  }

  onImageSaved(croppedImage: string) {
    if (croppedImage) {
      this.colaborador.fotoPerfil = croppedImage;
    }
    this.showImageCropper = false;
    this.selectedFile = undefined;
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
