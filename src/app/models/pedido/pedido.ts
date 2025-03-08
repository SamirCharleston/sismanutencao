import { OrdemDeServico } from "../ordem-de-servico/ordem-de-servico";
import { Insumo } from "./insumo";

export type PedidoStatus = 'Pendente' | 'Em andamento' | 'Concluído' | 'Cancelado';

export class Pedido {
    id!: number;
    numero!: string;
    descricao!: string;
    insumos!: Insumo[];
    valorTotal!: number;
    status!: PedidoStatus;
    dataPedido!: Date;
    dataEntrega!: Date;
    enderecoEntrega!: string;
    OSVinculada: OrdemDeServico | null = null;
    paraEstoque!: boolean;
    atendido!: boolean;
    solicitante!: string;
    categoria!: string;
    observacoes!: string;
    prioridade!: string;
}
