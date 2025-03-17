import { Injectable } from '@angular/core';
import { Item } from '../models/ordem-de-servico/item';
import { OrdemDeServico } from '../models/ordem-de-servico/ordem-de-servico';
import { Medicao } from '../models/medicao/medicao';
import { Insumo } from '../models/pedido/insumo';
import { Pedido, PedidoStatus } from '../models/pedido/pedido';
import { Colaborador } from '../models/colaborador/colaborador';
import { Observable, of } from 'rxjs';
import { Ferramenta, StatusFerramenta } from '../models/ferramenta/ferramenta';
import { EmprestimoFerramenta } from '../models/ferramenta/emprestimo-ferramenta';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Item[] = [];
  private ordens: OrdemDeServico[] = [];
  private medicoes: Medicao[] = [];
  private insumos: Insumo[] = [];
  private pedidos: Pedido[] = [];
  private colaboradores: Colaborador[] = [];

  private ferramentas: Ferramenta[] = [
    {
      id: 1,
      nome: 'Chave de Fenda Phillips',
      descricao: 'Chave de fenda phillips profissional 1/4',
      categoria: 'Mecânica',
      status: 'disponivel',
      // localizacao: 'Armário A1',
      imagemUrl: 'https://madeirasgasometro.vtexassets.com/arquivos/ids/170972/chave-de-fenda-5-16-x-4-vonder-plus-imagem-01.jpg?v=636858456547700000',
      dataAquisicao: new Date('2023-01-15'),
      quantidade: 10,
      marca: 'Tramontina',
      historicoDeUso: [],
      manutencao: false,
      // custodiante: this.colaboradores[0],
      quantidadeDisponivel: 10,
      quantidadeEmUso: 0
    },
    {
      id: 2,
      nome: 'Multímetro Digital',
      descricao: 'Multímetro digital com display LCD',
      categoria: 'Elétrica',
      status: 'em_uso',
      // localizacao: 'Gaveta B3',
      imagemUrl: 'https://www.deere.com.br/assets/images/region-3/products/home-and-workshop-products/ferramenta-thumb.png',
      dataAquisicao: new Date('2023-02-20'),
      quantidade: 5,
      marca: 'Minipa',
      historicoDeUso: [],
      manutencao: false,
      // custodiante: this.colaboradores[0],
      quantidadeDisponivel: 4,
      quantidadeEmUso: 1
    },
    {
      id: 3,
      nome: 'Alicate Universal',
      descricao: 'Alicate universal profissional 8"',
      categoria: 'Mecânica',
      status: 'disponivel',
      // localizacao: 'Armário A2',
      imagemUrl: 'https://cdn.leroymerlin.com.br/contents/40_tipos_de_ferramentas_nomes_e_para_que_servem_c3ee_original.jpg',
      dataAquisicao: new Date('2023-03-10'),
      quantidade: 8,
      marca: 'Gedore',
      historicoDeUso: [],
      manutencao: false,
      // custodiante: this.colaboradores[1],
      quantidadeDisponivel: 8,
      quantidadeEmUso: 0
    },
    {
      id: 4,
      nome: 'Martelo de Unha',
      descricao: 'Martelo de unha 23mm',
      categoria: 'Mecânica',
      status: 'disponivel',
      // localizacao: 'Armário A3',
      imagemUrl: 'https://img.lojadomecanico.com.br/IMAGENS/2/139/131290/1571843097346.JPG',
      dataAquisicao: new Date('2023-04-05'),
      quantidade: 7,
      marca: 'Tramontina',
      historicoDeUso: [],
      manutencao: false,
      // custodiante: this.colaboradores[1],
      quantidadeDisponivel: 7,
      quantidadeEmUso: 0
    },
    {
      id: 5,
      nome: 'Serra Tico-T',
      descricao: 'Serra tico-tico 500W',
      categoria: 'Mecânica',
      status: 'disponivel',
      // localizacao: 'Armário A4',
      imagemUrl: 'https://img.lojadomecanico.com.br/IMAGENS/2/139/131290/1571843097346.JPG',
      dataAquisicao: new Date('2023-05-12'),
      quantidade: 6,
      marca: 'Bosch',
      historicoDeUso: [],
      manutencao: false,
      // custodiante: this.colaboradores[2],
      quantidadeDisponivel: 6,
      quantidadeEmUso: 0
    },
  ];

  private historicoFerramentas: EmprestimoFerramenta[] = [
    {
      id: 1,
      responsavel: this.colaboradores[0],
      dataRetirada: new Date('2023-01-13'),
      dataDevolucao: new Date('2023-01-14'),
      observacoes: 'Observações sobre a retirada e devolução da ferramenta',
      ferramenta: this.ferramentas[1],
      devolvido: false,
      quantidade: 1
    },
    {
      id: 2,
      responsavel: this.colaboradores[1],
      dataRetirada: new Date('2023-01-15'),
      dataDevolucao: new Date('2023-01-16'),
      observacoes: 'Observações sobre a retirada e devolução da ferramenta',
      ferramenta: this.ferramentas[2],
      quantidade: 1,
      devolvido: false
    },
    {
      id: 3,
      responsavel: this.colaboradores[2],
      dataRetirada: new Date('2023-01-20'),
      dataDevolucao: new Date('2023-01-21'),
      observacoes: 'Observações sobre a retirada e devolução da ferramenta',
      ferramenta: new Ferramenta(),
      quantidade: 1,
      devolvido: true
    },
    {
      id: 4,
      responsavel: this.colaboradores[3],
      dataRetirada: new Date('2023-01-25'),
      dataDevolucao: new Date('2023-01-26'),
      observacoes: 'Observações sobre a retirada e devolução da ferramenta',
      ferramenta: new Ferramenta(),
      quantidade: 5,
      devolvido: false
    },
    {
      id: 5,
      responsavel: this.colaboradores[4],
      dataRetirada: new Date('2023-02-01'),
      dataDevolucao: new Date('2023-02-02'),
      observacoes: 'Observações sobre a retirada e devolução da ferramenta',
      ferramenta: new Ferramenta(),
      quantidade: 5,
      devolvido: true
    }
  ];

  constructor() {
    this.generateItems();
    this.generateOrdens();
    this.generateMedicoes();
    this.initializeInsumos();
    this.initializePedidos();
    this.initializeColaboradores();
    this.initializeFerramentas();
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

  private initializeInsumos() {
    const categorias = ['Elétrico', 'Hidráulico', 'Civil', 'Mecânico', 'Ferramentas', 'EPI', 'Material de Limpeza'];
    const unidades = ['un', 'mt', 'kg', 'l', 'pc', 'cx', 'par'];
    const nomes = ['Chave de Fenda', 'Martelo', 'Alicate', 'Parafuso', 'Porca', 'Cabo Elétrico', 'Disjuntor', 'Lâmpada LED', 'Fita Isolante', 'Luvas', 'Furadeira', 'Serra', 'Medidor', 'Nível', 'Trena'];

    for (let i = 1; i <= 150; i++) {
      const insumo = new Insumo();
      insumo.id = i;
      insumo.nome = nomes[i % nomes.length];
      insumo.valorUnitario = parseFloat((Math.random() * 100 + 1).toFixed(2));
      insumo.descricao = `${categorias[i % categorias.length]} - Item ${i}`;
      insumo.categoria = categorias[i % categorias.length];
      insumo.unidade = unidades[i % unidades.length];
      insumo.quantidade = Math.floor(Math.random() * 100) + 1;

      // Adiciona o endereco das imagens que estao na pasta app/assets
      insumo.enderecosImagens = [`https://madeirasgasometro.vtexassets.com/arquivos/ids/170972/chave-de-fenda-5-16-x-4-vonder-plus-imagem-01.jpg?v=636858456547700000`, "https://www.hfmultiferramentas.com.br/media/catalog/product/cache/90dbb86a669057d15fdb380e69490e5a/0/7/07d60d41-a5c5-408d-9f7f-416557434284ch_fenda_sata_6x100_2.jpg"];


      // insumo.enderecosImagens = ["app/assets/chave_fenda1.png", "app/assets/chave_fenda2.png"];
      
      this.insumos.push(insumo);
    }
  }

  private initializePedidos() {
    const status: PedidoStatus[] = ['Pendente', 'Em andamento', 'Concluído', 'Cancelado'];
    const enderecos = ['Almoxarifado Central', 'Setor de Manutenção', 'Depósito 1', 'Depósito 2'];
    const solicitantes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza'];
    const categorias = ['Material de Construção', 'Material Elétrico', 'Material Hidráulico', 'Ferramentas', 'EPI', 'Material de Escritório'];
    const prioridade = ['Baixa', 'Média', 'Alta', 'Urgente'];

    for (let i = 1; i <= 60; i++) {
      const pedido = new Pedido();
      pedido.id = i;
      pedido.descricao = `Pedido de materiais ${i}`;
      
      // Adiciona 3-8 insumos aleatórios ao pedido
      const numInsumos = Math.floor(Math.random() * 6) + 3;
      pedido.insumos = [];
      let valorTotal = 0;

      // Adiciona o solicitante do pedido
      pedido.solicitante = solicitantes[Math.floor(Math.random() * solicitantes.length)];

      //Adiciona a categoria
      pedido.categoria = categorias[Math.floor(Math.random() * categorias.length)];

      //Adiciona a prioridade
      pedido.prioridade = prioridade[Math.floor(Math.random() * prioridade.length)] as PedidoStatus;
      
      for (let j = 0; j < numInsumos; j++) {
        const insumoIndex = Math.floor(Math.random() * this.insumos.length);
        const quantidade = Math.floor(Math.random() * 10) + 1;
        const insumo = { ...this.insumos[insumoIndex] };
        insumo.quantidade = quantidade;
        pedido.insumos.push(insumo);
        valorTotal += insumo.valorUnitario * quantidade;
      }

      pedido.valorTotal = parseFloat(valorTotal.toFixed(2));
      pedido.status = status[Math.floor(Math.random() * status.length)];
      
      // Data do pedido entre hoje e 30 dias atrás
      const dataPedido = new Date();
      dataPedido.setDate(dataPedido.getDate() - Math.floor(Math.random() * 30));
      pedido.dataPedido = dataPedido;
      
      // Data de entrega entre 1 e 15 dias após o pedido
      const dataEntrega = new Date(dataPedido);
      dataEntrega.setDate(dataEntrega.getDate() + Math.floor(Math.random() * 15) + 1);
      pedido.dataEntrega = dataEntrega;
      
      pedido.enderecoEntrega = enderecos[Math.floor(Math.random() * enderecos.length)];
      pedido.paraEstoque = Math.random() > 0.5;
      pedido.atendido = pedido.status === 'Concluído';
      pedido.OSVinculada = this.ordens[Math.floor(Math.random() * this.ordens.length)];

      this.pedidos.push(pedido);
    }
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private initializeColaboradores() {
    const cargos = ['Técnico', 'Engenheiro', 'Supervisor', 'Analista', 'Assistente'];
    const setores = ['Manutenção', 'Projetos', 'Qualidade', 'Operações', 'Administrativo'];
    const status = ['Ativo', 'Férias', 'Licença', 'Inativo', 'Desligado'];
    const fotoPerfill = ['https://www.olhodigital.com.br/wp-content/uploads/2023/03/foto_colaborador_01b.fw_.png', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEgMt-qIvipU3U831fhpmTPt5ZGtrI3IB3A&s',
    'https://mundocarreira.com.br/wp-content/uploads/2018/09/Aplicativo-Felicidade-Colaborador.jpg']

    this.colaboradores = Array.from({ length: 20 }, (_, i) => {
      const colaborador = new Colaborador();
      colaborador.id = i + 1;
      colaborador.matricula = `MAT${String(i + 1).padStart(4, '0')}`;
      colaborador.nome = `Colaborador ${i + 1}`;
      colaborador.cargo = cargos[Math.floor(Math.random() * cargos.length)];
      colaborador.setor = setores[Math.floor(Math.random() * setores.length)];
      colaborador.status = status[Math.floor(Math.random() * status.length)] as any;
      colaborador.fotoPerfil = fotoPerfill[Math.floor(Math.random() * fotoPerfill.length)];
      colaborador.dataAdmissao = new Date(2020 + Math.floor(Math.random() * 4), 
                                        Math.floor(Math.random() * 12), 
                                        Math.floor(Math.random() * 28) + 1);
      return colaborador;
    });
  }

  private initializeFerramentas() {
    const marcas = ['Tramontina', 'Gedore', 'Bosch', 'Makita', 'DeWalt', 'Stanley', 'Minipa'];
    const categorias = ['Mecânica', 'Elétrica', 'Medição', 'Hidráulica'];
    const localizacoes = ['Armário A1', 'Armário A2', 'Gaveta B1', 'Gaveta B2', 'Estante C1'];
    const status: StatusFerramenta[] = ['disponivel', 'em_uso', 'manutencao'];

    // Generate remaining tools
    for (let i = 4; i <= 20; i++) {
      const ferramenta: Ferramenta = {
        id: i,
        nome: `Ferramenta ${i}`,
        descricao: `Descrição da ferramenta ${i}`,
        categoria: categorias[Math.floor(Math.random() * categorias.length)],
        status: status[Math.floor(Math.random() * status.length)],
        // localizacao: localizacoes[Math.floor(Math.random() * localizacoes.length)],
        imagemUrl: `assets/images/tools/tool${i}.jpg`,
        dataAquisicao: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        quantidade: Math.floor(Math.random() * 10) + 1,
        marca: marcas[Math.floor(Math.random() * marcas.length)],
        historicoDeUso: [],
        manutencao: Math.random() > 0.8,
        // custodiante: this.colaboradores[Math.floor(Math.random() * this.colaboradores.length)],
        quantidadeDisponivel: Math.floor(Math.random() * 10) + 1,
        quantidadeEmUso: Math.floor(Math.random() * 5)
      };
      this.ferramentas.push(ferramenta);
    }
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

  getInsumos(): Insumo[] {
    return this.insumos;
  }

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  getOrdensDisponiveis(): OrdemDeServico[] {
    return this.ordens.filter(os => os.status !== 'Concluída');
  }

  getColaboradores(): Colaborador[] {
    return this.colaboradores;
  }

  getFerramentas(): Observable<Ferramenta[]> {
    return of(this.ferramentas);
  }

  getFerramentaPorId(id: string): Observable<Ferramenta | undefined> {
    return of(this.ferramentas.find(f => f.id === Number(id)));
  }

  getHistoricoFerramentas(): EmprestimoFerramenta[] {
    return this.historicoFerramentas;
  }
}
