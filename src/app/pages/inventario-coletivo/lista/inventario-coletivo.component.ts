import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ferramenta, StatusFerramenta } from '../../../models/ferramenta/ferramenta';
import { DataService } from '../../../services/data.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventario-coletivo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './inventario-coletivo.component.html',
  styleUrls: ['./inventario-coletivo.component.css']
})
export class InventarioColetivoComponent implements OnInit {
  ferramentas: Ferramenta[] = [];
  loading = false;
  searchTerm = '';
  selectedCategory = 'Todas';
  categories = ['Todas', 'Mecânica', 'Elétrica', 'Medição'];

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFerramentas();
  }

  loadFerramentas(): void {
    this.loading = true;
    this.dataService.getFerramentas().subscribe({
      next: (ferramentas) => {
        this.ferramentas = ferramentas;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar ferramentas', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  get filteredFerramentas(): Ferramenta[] {
    return this.ferramentas.filter(ferramenta => {
      const matchesSearch = ferramenta.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          ferramenta.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todas' || ferramenta.categoria === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getStatusIcon(status: StatusFerramenta): string {
    switch (status) {
      case 'disponivel': return 'check_circle';
      case 'em_uso': return 'person';
      case 'manutencao': return 'build';
      default: return 'help';
    }
  }

  getStatusText(status: StatusFerramenta): string {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'em_uso': return 'Em uso';
      case 'manutencao': return 'Em manutenção';
      default: return 'Status desconhecido';
    }
  }
}
