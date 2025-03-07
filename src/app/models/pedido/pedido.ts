import { OrdemDeServico } from "../ordem-de-servico/ordem-de-servico";
import { Insumo } from "./insumo";

export class Pedido {
    id!: number;
    descricao!: string;
    insumos!: Insumo[];
    valorTotal!: number;
    status!: string;
    dataPedido!: string;
    dataEntrega!: string;
    enderecoEntrega!: string;
    OSVinculada!: OrdemDeServico;
    paraEstoque!: boolean;
    atendido!: boolean;
}
