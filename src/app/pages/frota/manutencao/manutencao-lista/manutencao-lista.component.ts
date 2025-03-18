import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarroManutencao, StatusManutencao, TipoManutencao } from '../../../../models/frota/carro-manutencao';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-manutencao-lista',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule],
  templateUrl: './manutencao-lista.component.html',
  styleUrls: ['./manutencao-lista.component.css']
})
export class ManutencaoListaComponent implements OnInit {
  manutencoes: CarroManutencao[] = [];
  loading = true;
  searchTerm = '';
  selectedStatus: StatusManutencao | 'todas' = 'todas';
  selectedTipo: TipoManutencao | 'todas' = 'todas';

  statusOptions = ['todas', 'pendente', 'em_andamento', 'concluida', 'cancelada'];
  tipoOptions = ['todas', 'preventiva', 'corretiva', 'revisao', 'troca_oleo'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadManutencoes();
  }

  loadManutencoes() {
    this.dataService.getManutencoesCarros().subscribe({
      next: (manutencoes) => {
        this.manutencoes = manutencoes;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredManutencoes(): CarroManutencao[] {
    return this.manutencoes.filter(manutencao => {
      const matchesSearch = 
        manutencao.carro.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manutencao.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'todas' || manutencao.status === this.selectedStatus;
      const matchesTipo = this.selectedTipo === 'todas' || manutencao.tipo === this.selectedTipo;
      
      return matchesSearch && matchesStatus && matchesTipo;
    });
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  getStatusColor(status: StatusManutencao): string {
    switch (status) {
      case 'pendente': return '#ff9800';
      case 'em_andamento': return '#2196f3';
      case 'concluida': return '#4caf50';
      case 'cancelada': return '#f44336';
      default: return '#999';
    }
  }

  getStatusIcon(status: StatusManutencao): string {
    switch (status) {
      case 'pendente': return 'schedule';
      case 'em_andamento': return 'build';
      case 'concluida': return 'check_circle';
      case 'cancelada': return 'cancel';
      default: return 'help';
    }
  }

  getTipoIcon(tipo: TipoManutencao): string {
    switch (tipo) {
      case 'preventiva': return 'healing';
      case 'corretiva': return 'build';
      case 'revisao': return 'verified';
      case 'troca_oleo': return 'local_gas_station';
      default: return 'build';
    }
  }
}
