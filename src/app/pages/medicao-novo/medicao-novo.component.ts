import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Medicao } from '../../models/medicao/medicao';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-medicao-novo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicao-novo.component.html',
  styleUrls: ['./medicao-novo.component.css', '../../../styles/shared-buttons.css']
})
export class MedicaoNovoComponent {
  medicao: Medicao = new Medicao();
  ordensDisponiveis: OrdemDeServico[] = [];
  ordensSelecionadas: OrdemDeServico[] = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.initializeMedicao();
    this.loadOrdensDisponiveis();
  }

  private initializeMedicao() {
    this.medicao = {
      ...new Medicao(),
      dataMedicao: new Date(),
      ordensDeServico: [],
      ansLogistica: 10,
      valorDescontosANS: 0,
      valorRPL: 0,
      valorREQ: 0,
      valorTotalOSs: 0,
      totalMedicao: 0
    };
  }

  private loadOrdensDisponiveis() {
    // Carregar apenas ordens concluídas que não estão em outras medições
    this.ordensDisponiveis = this.dataService.getOrdens()
      .filter(os => os.status === 'Concluída');
  }

  adicionarOrdem(ordem: OrdemDeServico) {
    this.ordensSelecionadas.push(ordem);
    this.ordensDisponiveis = this.ordensDisponiveis.filter(o => o.id !== ordem.id);
    this.calcularValores();
  }

  removerOrdem(ordem: OrdemDeServico) {
    this.ordensDisponiveis.push(ordem);
    this.ordensSelecionadas = this.ordensSelecionadas.filter(o => o.id !== ordem.id);
    this.calcularValores();
  }

  calcularValores() {
    this.medicao.valorTotalOSs = this.ordensSelecionadas
      .reduce((total, os) => total + os.valorFinal, 0);
    
    this.medicao.valorDescontosANS = 0;
    this.ordensSelecionadas.forEach(os => {
      let desconto = os.valorFinal - (os.valorFinal * (os.ans/10));
      this.medicao.valorDescontosANS += desconto;
    });

    // Realiza os descontos da ANS sobre o valor RPL e soma ao valor de descontos
    this.medicao.valorDescontosANS += this.medicao.valorRPL - (this.medicao.valorRPL * (this.medicao.ansLogistica/10))

    this.medicao.totalMedicao = parseFloat(
      (this.medicao.valorRPL + this.medicao.valorREQ + this.medicao.valorTotalOSs - this.medicao.valorDescontosANS).toFixed(2)
    );
  }

  onANSChange() {
    if (this.medicao.ansLogistica < 0) this.medicao.ansLogistica = 0;
    if (this.medicao.ansLogistica > 100) this.medicao.ansLogistica = 100;
    this.calcularValores();
  }

  onSubmit() {
    if (this.validateForm()) {
      this.medicao.ordensDeServico = this.ordensSelecionadas;
      console.log('Nova medição:', this.medicao);
      this.router.navigate(['/dashboard/medicoes']);
    }
  }

  private validateForm(): boolean {
    return !!(this.medicao.dataMedicao && 
             this.ordensSelecionadas.length > 0 &&
             this.medicao.ansLogistica >= 0 &&
             this.medicao.ansLogistica <= 100);
  }

  onCancel() {
    this.router.navigate(['/dashboard/medicoes']);
  }
}
