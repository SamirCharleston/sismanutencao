import { Carro } from './carro';

export class CarroManutencao {
  id!: number;
  carro!: Carro;
  dataInicio!: Date;
  dataFim!: Date;
  tipo!: TipoManutencao;
  descricao!: string;
  custo!: number;
  quilometragem!: number;
  oficina!: string;
  notaFiscal!: string;
  observacoes!: string;
  status: StatusManutencao = 'pendente';
  itensServico!: ItemServico[];
}

export interface ItemServico {
  id: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export type TipoManutencao = 'preventiva' | 'corretiva' | 'revisao' | 'troca_oleo';
export type StatusManutencao = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';