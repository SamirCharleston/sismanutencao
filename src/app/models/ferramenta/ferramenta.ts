import { Colaborador } from "../colaborador/colaborador";
import { HistoricoFerramenta } from "./historico-ferramenta";

export class Ferramenta {
  id!: number;
  nome!: string;
  descricao!: string;
  categoria!: string;
  status!: StatusFerramenta;
  localizacao!: string;
  imagemUrl!: string;
  dataAquisicao!: Date;
  quantidade!: number;
  marca!: string;
  custodiante: Colaborador = new Colaborador();
  historicoDeUso!: HistoricoFerramenta[];
  manutencao!: boolean;
}

export type StatusFerramenta = 'disponivel' | 'em_uso' | 'manutencao';
