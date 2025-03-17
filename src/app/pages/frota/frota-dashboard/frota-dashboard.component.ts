import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Carro, StatusCarro } from '../../../models/frota/carro';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-frota-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './frota-dashboard.component.html',
  styleUrls: ['./frota-dashboard.component.css']
})
export class FrotaDashboardComponent implements OnInit {
  carros: Carro[] = [];
  loading = true;

  // Dashboard metrics
  metricas = {
    total: 0,
    disponiveis: 0,
    emUso: 0,
    emManutencao: 0,
    inativos: 0,
    proximasManutencoes: 0
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadCarros();
  }

  loadCarros() {
    // To be implemented in DataService
    this.dataService.getCarros().subscribe({
      next: (carros) => {
        this.carros = carros;
        this.calcularMetricas();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  calcularMetricas() {
    this.metricas = {
      total: this.carros.length,
      disponiveis: this.carros.filter(c => c.status === 'disponivel').length,
      emUso: this.carros.filter(c => c.status === 'em_uso').length,
      emManutencao: this.carros.filter(c => c.status === 'manutencao').length,
      inativos: this.carros.filter(c => c.status === 'inativo').length,
      proximasManutencoes: this.carros.filter(c => {
        if (!c.proxManuProgramada) return false;
        const dias = Math.floor((c.proxManuProgramada.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return dias <= 7;
      }).length
    };
  }

  getStatusColor(status: StatusCarro): string {
    switch (status) {
      case 'disponivel': return '#4caf50';
      case 'em_uso': return '#2196f3';
      case 'manutencao': return '#ff9800';
      case 'inativo': return '#f44336';
      default: return '#999';
    }
  }

  getStatusIcon(status: StatusCarro): string {
    switch (status) {
      case 'disponivel': return 'check_circle';
      case 'em_uso': return 'directions_car';
      case 'manutencao': return 'build';
      case 'inativo': return 'cancel';
      default: return 'help';
    }
  }
}
