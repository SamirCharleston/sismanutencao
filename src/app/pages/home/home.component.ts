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

  onSubmit() {
    console.log('Login attempt:', this.loginData);
    // Adicionar lógica de autenticação aqui
  }

  onRegister() {
    this.loaderService.navigateWithLoader('/registrar');
  }
}
