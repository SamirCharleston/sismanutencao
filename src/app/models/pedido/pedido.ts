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
    // cotacoes!: any[];
}
