import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  registerData = {
    nome: '',
    matricula: '',
    login: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(
    private loaderService: LoaderService
  ) {}

  onSubmit() {
    console.log('Register attempt:', this.registerData);
    // Adicionar lógica de registro aqui
  }

  onCancel() {
    this.loaderService.navigateWithLoader('/home');
  }
}
