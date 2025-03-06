import { Injectable } from '@angular/core';
import { Item } from '../models/ordem-de-servico/item';
import { OrdemDeServico } from '../models/ordem-de-servico/ordem-de-servico';
import { Medicao } from '../models/medicao/medicao';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Item[] = [];
  private ordens: OrdemDeServico[] = [];
  private medicoes: Medicao[] = [];

  constructor() {
    this.generateItems();
    this.generateOrdens();
    this.generateMedicoes();
  }

  private generateItems() {

    const unidades = ['un', 'm', 'kg', 'cm', 'l', 'm²', 'm³', 'g', 'mm', 'ml', 'mg', 'km', 'h', 'min', 's'];
    const names = [
      'Chave de Fenda', 'Martelo', 'Alicate', 'Parafuso', 'Porca',
      'Cabo Elétrico', 'Disjuntor', 'Lâmpada LED', 'Fita Isolante', 'Luvas',
      'Furadeira', 'Serra', 'Medidor', 'Nível', 'Trena'
    ];

    this.items = Array.from({ length: 30 }, (_, i) => {
      const item = new Item();
      item.id = i + 1;
      item.unidade = unidades[Math.floor(Math.random() * unidades.length)];
      item.descricao = `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      item.quantidade = Math.floor(Math.random() * 50) + 1;
      item.valorUnitario = parseFloat((Math.random() * 1000 + 10).toFixed(2));
      return item;
    });
  }

  private generateOrdens() {
    const status = ['Em andamento', 'Pendente', 'Concluída', 'Em análise', 'Atrasada'];
    const locais = ['Bloco A', 'Bloco B', 'Bloco C', 'Laboratório 1', 'Laboratório 2', 'Oficina', 'Almoxarifado'];
    const areas = ['Manutenção', 'TI', 'Elétrica', 'Mecânica', 'Civil', 'Refrigeração'];
    const fiscais = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza'];

    this.ordens = Array.from({ length: 100 }, (_, i) => {
      const ordem = new OrdemDeServico();
      ordem.id = i + 1;
      ordem.numero = `2023${(i + 1).toString().padStart(3, '0')}`;
      ordem.glpi = 123400 + i;
      ordem.fiscal = fiscais[Math.floor(Math.random() * fiscais.length)];
      ordem.local = locais[Math.floor(Math.random() * locais.length)];
      ordem.areaSolicitante = areas[Math.floor(Math.random() * areas.length)];
      
      // Gerar datas aleatórias em um intervalo realista
      const startDate = new Date(2023, 0, 1);
      const endDate = new Date(2024, 11, 31);
      ordem.dataInicio = this.randomDate(startDate, endDate);
      ordem.dataFim = new Date(ordem.dataInicio);
      ordem.dataFim.setDate(ordem.dataFim.getDate() + Math.floor(Math.random() * 30) + 1);
      
      ordem.valorInicial = parseFloat((Math.random() * 10000 + 100).toFixed(2));
      ordem.valorFinal = ordem.valorInicial * (1 + Math.random() * 0.5); // Valor final até 50% maior
      ordem.status = status[Math.floor(Math.random() * status.length)];
      ordem.descricaoServico = `Serviço de adequação ${ordem.numero} - ${ordem.areaSolicitante}`;

      // Adicionar itens aleatórios à OS
      const numItems = Math.floor(Math.random() * 20) + 1;
      ordem.itens = Array.from({ length: numItems }, () => {
        return this.items[Math.floor(Math.random() * this.items.length)];
      });

      if (ordem.status === 'Concluída') {
        ordem.dataConclusao = new Date(ordem.dataFim);
      }

      return ordem;
    });
  }

  private generateMedicoes() {
    this.medicoes = Array.from({ length: 40 }, (_, i) => {
      const medicao = new Medicao();
      
      medicao.id = i + 1;
      medicao.numero = 2023001 + i;
      medicao.dataMedicao = this.randomDate(new Date(2023, 0, 1), new Date());
      medicao.descricao = `Medição ${medicao.numero} - ${new Date(medicao.dataMedicao).toLocaleDateString()}`;
      
      // Selecionar algumas ordens aleatórias para a medição
      const numOrdens = Math.floor(Math.random() * 5) + 1; // 1 a 5 ordens por medição
      medicao.ordensDeServico = Array.from({ length: numOrdens }, () => {
        return this.ordens[Math.floor(Math.random() * this.ordens.length)];
      });

      // Calcular valores baseados nas ordens selecionadas
      medicao.valorTotalOSs = medicao.ordensDeServico.reduce((total, os) => total + os.valorFinal, 0);
      medicao.valorRPL = parseFloat((medicao.valorTotalOSs * 0.95).toFixed(2)); // 95% do valor total
      medicao.valorREQ = parseFloat((medicao.valorTotalOSs * 0.05).toFixed(2)); // 5% do valor total
      
      // Gerar ANS Logística aleatório entre 80 e 100
      medicao.ansLogistica = parseFloat((80 + Math.random() * 20).toFixed(2));
      
      // Calcular descontos baseados no ANS
      const percentualDesconto = (100 - medicao.ansLogistica) / 100;
      medicao.valorDescontosANS = parseFloat((medicao.valorREQ * percentualDesconto).toFixed(2));
      
      // Calcular total final da medição
      medicao.totalMedicao = parseFloat((medicao.valorRPL + medicao.valorREQ - medicao.valorDescontosANS).toFixed(2));

      return medicao;
    });
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getItems(): Item[] {
    return this.items;
  }

  getOrdens(): OrdemDeServico[] {
    return this.ordens;
  }

  getMedicoes(): Medicao[] {
    return this.medicoes;
  }
}
