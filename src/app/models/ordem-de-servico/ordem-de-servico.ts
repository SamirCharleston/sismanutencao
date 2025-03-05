import { Item } from "./item";

export class OrdemDeServico {
    id: number = 0;
    numero: string = '';
    glpi: number = 0;
    fiscal: string = '';
    local: string = '';
    areaSolicitante: string = '';
    dataInicio: Date = new Date();
    dataFim: Date = new Date();
    dataConclusao: Date = new Date();
    valorInicial: number = 0;
    valorFinal: number = 0;
    descricaoServico: string = '';
    status: string = '';
    itens: Item[] = [];
}
