import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Medicao } from '../../models/medicao/medicao';

@Component({
  selector: 'app-medicoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medicoes.component.html',
  styleUrls: ['./medicoes.component.css']
})
export class MedicoesComponent implements OnInit {
  medicoes: Medicao[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.medicoes = this.dataService.getMedicoes()
      .sort((a, b) => b.dataMedicao.getTime() - a.dataMedicao.getTime());
  }

  getMesAno(data: Date): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const dataObj = new Date(data);
    return `${meses[dataObj.getMonth()]} de ${dataObj.getFullYear()}`;
  }
}
