import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private loaderService: LoaderService
  ) {}

  async onSubmit() {
    // Simulação básica de autenticação
    if (this.loginData.username && this.loginData.password) {
      this.loaderService.show();
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula verificação
        await this.loaderService.navigateWithLoader('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      } finally {
        this.loaderService.hide();
      }
    }
  }

  onRegister() {
    this.loaderService.navigateWithLoader('/registrar');
  }
}
