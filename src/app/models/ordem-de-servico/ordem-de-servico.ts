import { Medicao } from "../medicao/medicao";
import { Arquivo } from "./arquivo";
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
    arquivos!: Arquivo[];
    ans!: number;
    Medicao!: Medicao;
}
