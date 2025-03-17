import { Colaborador } from "../colaborador/colaborador";
import { Ferramenta } from "./ferramenta";

export class EmprestimoFerramenta{
  id!: number;
  responsavel!: Colaborador;
  dataDevolucao!: Date;
  dataRetirada!: Date;
  ferramenta!: Ferramenta;
  observacoes!: string;
  devolvido!: boolean;
  quantidade!: number;
}
