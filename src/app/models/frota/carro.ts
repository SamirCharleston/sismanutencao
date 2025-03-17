export class Carro {
  id!: number;
  placa!: string;
  modelo!: string;
  marca!: string;
  ano!: number;
  quilometragem!: number;
  status!: StatusCarro;
  ultimaRevisao?: Date; // Mudar para revisao
  proxRevisao?: Date; // Mudar para revisao
  imagemUrl?: string;
  motorista?: string; // Mudar para responsavel
  setor?: string;
  combustivel: TipoCombustivel = 'Gasolina';
  renavam?: string;
  chassi?: string;
}

export type StatusCarro = 'disponivel' | 'em_uso' | 'manutencao' | 'inativo';
export type TipoCombustivel = 'Gasolina' | 'Etanol' | 'Diesel' | 'Flex' | 'GNV';
