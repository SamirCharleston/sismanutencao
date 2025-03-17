import { Colaborador } from "../colaborador/colaborador";
import { EmprestimoFerramenta } from "./emprestimo-ferramenta";

export class Ferramenta {
  id!: number;
  nome!: string;
  descricao!: string;
  categoria!: string;
  status!: StatusFerramenta;
  // localizacao!: string;
  imagemUrl!: string;
  dataAquisicao!: Date;
  quantidade!: number;
  marca!: string;
  // custodiante: Colaborador = new Colaborador();
  historicoDeUso!: EmprestimoFerramenta[];
  manutencao!: boolean;
  quantidadeDisponivel!: number;
  quantidadeEmUso!: number;
}

export type StatusFerramenta = 'disponivel' | 'em_uso' | 'manutencao';
