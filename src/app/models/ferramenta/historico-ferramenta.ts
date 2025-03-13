import { Colaborador } from "../colaborador/colaborador";

export class HistoricoFerramenta {
  id!: number;
  colaborador!: Colaborador;
  dataRetirada!: Date;
  dataDevolucao!: Date;
  observacoes!: string;
}
