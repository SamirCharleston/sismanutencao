import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Colaborador } from '../../models/colaborador/colaborador';
import { DataService } from '../../services/data.service';
import { SearchService } from '../../services/search.service';
import { ColaboradorCardsComponent } from './colaborador-cards/colaborador-cards.component';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, RouterModule, ColaboradorCardsComponent],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  filteredColaboradores: Colaborador[] = [];
  statusColors = {
    'Ativo': 'status-completed',
    'Inativo': 'status-cancelled',
    'Férias': 'status-pending',
    'Licença': 'status-progress',
    'Desligado': 'status-cancelled'
  };
  viewMode: 'table' | 'cards' = 'cards';

  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadColaboradores();
    this.setupSearch();
  }

  private loadColaboradores() {
    this.colaboradores = this.dataService.getColaboradores();
    this.filteredColaboradores = this.colaboradores;
  }

  private setupSearch() {
    this.searchService.searchTerm$.subscribe(term => {
      if (!term) {
        this.filteredColaboradores = this.colaboradores;
      } else {
        this.filteredColaboradores = this.colaboradores.filter(colaborador =>
          colaborador.nome.toLowerCase().includes(term.toLowerCase()) ||
          colaborador.matricula.toLowerCase().includes(term.toLowerCase()) ||
          colaborador.setor.toLowerCase().includes(term.toLowerCase())
        );
      }
    });
  }

  getStatusClass(status: string): string {
    return this.statusColors[status as keyof typeof this.statusColors] || 'status-default';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  toggleView() {
    this.viewMode = this.viewMode === 'table' ? 'cards' : 'table';
  }
}
