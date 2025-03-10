import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Colaborador } from '../../../models/colaborador/colaborador';

@Component({
  selector: 'app-colaborador-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colaborador-cards.component.html',
  styleUrls: ['./colaborador-cards.component.css']
})
export class ColaboradorCardsComponent {
  @Input() colaboradores: Colaborador[] = [];

  getDefaultImage(): string {
    return 'assets/images/default-avatar.png';
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

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
