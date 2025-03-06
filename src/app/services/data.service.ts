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
    const areas = ['SI.DAF', 'MP.DTUR', 'IS.DAF', 'TS.DTUR', 'CN.DNE', 'CTI.DTUR', 'CTI.DAF'];
    const fiscais = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza'];

    this.ordens = Array.from({ length: 100 }, (_, i) => {
      const ordem = new OrdemDeServico();
      ordem.id = i + 1;
      ordem.numero = `${(i + 1).toString().padStart(3, '0')}`;
      ordem.glpi = 123400 + i;
      ordem.fiscal = fiscais[Math.floor(Math.random() * fiscais.length)];
      ordem.local = locais[Math.floor(Math.random() * locais.length)];
      ordem.areaSolicitante = areas[Math.floor(Math.random() * areas.length)];
      
      // Gerar datas aleatórias em um intervalo realista
      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2025, 11, 31);
      ordem.dataInicio = this.randomDate(startDate, endDate);

      // Cuida para que a data de fim seja sempre após a data de início
      ordem.dataFim = this.randomDate(ordem.dataInicio, endDate);

      // Cuida para que a data de conclusão seja sempre igual ou após a data de inicio
      ordem.dataConclusao = this.randomDate(ordem.dataInicio, endDate);

      // Cria um valor aleatório para ans entre 0.00 e 10.00 que seja multiplo de 0.50 ou seja o resultado de 0.00 + 0.50 * n, sendo que 80% das ordens de servico sempre levam ans 10.00
      ordem.ans = Math.random() < 0.8 ? 10 : 0;
      ordem.status = "Concluída";
      if(ordem.ans === 0){
        ordem.ans = parseFloat((Math.random() * 10).toFixed(2));
        ordem.ans = parseFloat((Math.floor(ordem.ans * 2) / 2).toFixed(2));
        ordem.status = status[Math.floor(Math.random() * status.length)];
      }

      ordem.valorInicial = parseFloat((Math.random() * 10000 + 100).toFixed(2));

      // Calcula o valor final baseado no valor inicial e no ANS
      ordem.valorFinal = parseFloat((ordem.valorInicial * (ordem.ans / 10)).toFixed(2));

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
    // Agrupa as ordens por mês/ano
    const ordensAgrupadas = this.ordens.reduce((groups, ordem) => {
      const date = new Date(ordem.dataConclusao);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      // Apenas ordens concluídas
      if (ordem.status === 'Concluída') {
        groups[key].push(ordem);
      }
      return groups;
    }, {} as { [key: string]: OrdemDeServico[] });

    // Cria medições para cada grupo de ordens
    this.medicoes = Object.entries(ordensAgrupadas)
      .filter(([_, ordens]) => ordens.length > 0) // Apenas grupos com ordens
      .map(([key, ordens], index) => {
        const [year, month] = key.split('-');
        const medicao = new Medicao();
        
        medicao.id = index + 1;
        medicao.numero = parseInt(`${year}${month.padStart(2, '0')}${(index + 1).toString().padStart(3, '0')}`);
        medicao.dataMedicao = new Date(parseInt(year), parseInt(month) - 1, 1);
        medicao.descricao = `Medição ${medicao.numero} - ${new Date(medicao.dataMedicao).toLocaleDateString()}`;
        medicao.ordensDeServico = ordens;

        // Calcula valores baseados nas ordens selecionadas
        medicao.valorTotalOSs = ordens.reduce((total, os) => total + os.valorFinal, 0);
        medicao.valorRPL = parseFloat((medicao.valorTotalOSs * 0.95).toFixed(2));
        medicao.valorREQ = parseFloat((medicao.valorTotalOSs * 0.05).toFixed(2));

        // Calcula ANS Logística baseado na média das ANS das ordens
        const mediaANS = ordens.reduce((sum, os) => sum + os.ans, 0) / ordens.length;
        medicao.ansLogistica = parseFloat(mediaANS.toFixed(2));

        // Calcula descontos baseados no ANS
        const percentualDesconto = (10 - medicao.ansLogistica) / 10;
        medicao.valorDescontosANS = parseFloat((medicao.valorREQ * percentualDesconto).toFixed(2));

        // Calcula total final da medição
        medicao.totalMedicao = parseFloat((medicao.valorRPL + medicao.valorREQ - medicao.valorDescontosANS).toFixed(2));

        // Associa a medição às ordens
        ordens.forEach(ordem => {
          ordem.Medicao = medicao;
        });

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
