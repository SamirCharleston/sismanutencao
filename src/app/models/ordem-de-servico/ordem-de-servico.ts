import { Item } from "./item";

export class OrdemDeServico {
    id!: number;
    numero!: string;
    glpi!: number;
    fiscal!: string;
    local!: string;
    areaSolicitante!: string;
    dataInicio!: Date;
    dataFim!: Date;
    dataConclusao!: Date;
    valorInicial!: number;
    valorFinal!: number;
    descricaoServico!: string;
    status!: string;
    itens!: Item[];
}
