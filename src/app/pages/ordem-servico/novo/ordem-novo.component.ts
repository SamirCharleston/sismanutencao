import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdemDeServico } from '../../../models/ordem-de-servico/ordem-de-servico';
import { Item } from '../../../models/ordem-de-servico/item';

@Component({
  selector: 'app-ordem-novo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordem-novo.component.html',
  styleUrls: ['./ordem-novo.component.css']
})
export class OrdemNovoComponent {
  ordem: OrdemDeServico = new OrdemDeServico();
  newItem: Item = new Item();
  areasSolicitantes = ['SI.DAF', 'MP.DTUR', 'IS.DAF', 'TS.DTUR', 'CN.DNE', 'CTI.DTUR', 'CTI.DAF'];
  locais = ['Bloco A', 'Bloco B', 'Bloco C', 'Laboratório 1', 'Laboratório 2', 'Oficina', 'Almoxarifado'];
  unidades = ['un', 'm', 'kg', 'cm', 'l', 'm²', 'm³', 'g', 'mm', 'ml'];

  constructor(private router: Router) {
    this.initializeOrdem();
  }

  private initializeOrdem() {
    this.ordem = {
      ...new OrdemDeServico(),
      status: 'Pendente',
      dataInicio: new Date(),
      dataFim: new Date(),
      itens: []
    };
  }

  addItem() {
    if (this.validateItem()) {
      this.newItem.valorTotal = this.newItem.quantidade * this.newItem.valorUnitario;
      this.ordem.itens.push({...this.newItem});
      this.newItem = new Item();
      this.calculateTotal();
    }
  }

  removeItem(index: number) {
    this.ordem.itens.splice(index, 1);
    this.calculateTotal();
  }

  private calculateTotal() {
    this.ordem.valorInicial = this.ordem.itens.reduce((total, item) => 
      total + (item.quantidade * item.valorUnitario), 0);
  }

  validateItem(): boolean {
    return !!(this.newItem.descricao && 
             this.newItem.unidade && 
             this.newItem.quantidade > 0 && 
             this.newItem.valorUnitario > 0);
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Nova ordem:', this.ordem);
      this.router.navigate(['/dashboard/ordens']);
    }
  }

  private validateForm(): boolean {
    return !!(this.ordem.glpi &&
             this.ordem.fiscal &&
             this.ordem.local &&
             this.ordem.areaSolicitante &&
             this.ordem.descricaoServico &&
             this.ordem.itens.length > 0);
  }

  onCancel() {
    this.router.navigate(['/dashboard/ordens']);
  }

  calcularTotal(): number {
    return this.ordem.itens.reduce((total, item) => total + (item.quantidade * item.valorUnitario), 0);
  }
}
