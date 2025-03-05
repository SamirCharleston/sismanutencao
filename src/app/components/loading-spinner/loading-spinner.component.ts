import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container">
      <div class="spinner">
        <i class="material-icons rotating">refresh</i>
      </div>
      <span>Carregando mais ordens de serviço...</span>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      gap: 0.5rem;
      color: #666;
    }

    .spinner {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .rotating {
      animation: rotate 1s infinite linear;
      font-size: 2rem;
      color: #ff9248;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {}
