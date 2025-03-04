import { Item } from "./item";

export class OrdemDeServico {
    id!: number;
    numero!: string;
    glpi!: string;
    fiscal!: string;
    local!: string;
    areaSolicitante!: string;
    dataInicio!: string;
    dataFim!: string;
    dataConclusao!: string;
    valorInicial!: number;
    valorFinal!: number;
    descricaoServico!: string;
    status!: string;
    itens!: Item[];
}
