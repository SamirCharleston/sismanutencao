export class Carro {
  id!: number;
  placa!: string;
  modelo!: string;
  marca!: string;
  ano!: number;
  quilometragem!: number;
  status!: StatusCarro;
  ultimaManutencao?: Date;
  proxManuProgramada?: Date;
  imagemUrl?: string;
  motorista?: string;
  setor?: string;
  combustivel: TipoCombustivel = 'Gasolina';
  renavam?: string;
  chassi?: string;
}

export type StatusCarro = 'disponivel' | 'em_uso' | 'manutencao' | 'inativo';
export type TipoCombustivel = 'Gasolina' | 'Etanol' | 'Diesel' | 'Flex' | 'GNV';
