import { OrdemDeServico } from "../ordem-de-servico/ordem-de-servico";

export class Medicao {
    id!: number;
    numero!: number;
    dataMedicao!: Date;
    descricao!: string;
    ordensDeServico!: OrdemDeServico[];
    valorRPL!: number;
    valorREQ!: number;
    ansLogistica!: number;
    valorTotalOSs!: number;
    valorDescontosANS!: number;
    totalMedicao!: number;
}