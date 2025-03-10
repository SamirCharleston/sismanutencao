export class Colaborador {
  id: number;
  matricula: string;
  nome: string;
  rg: string;
  cpf: string;
  cargo: string;
  setor: string;
  endereco: string;
  telefone: string;
  email: string;
  dataNascimento: Date;
  dataAdmissao: Date;
  dataDesligamento: Date;
  motivoDesligamento: string;
  status: ColaboradorStatus;
  fotoPerfil?: string;

  constructor() {
    this.id = 0;
    this.matricula = '';
    this.nome = '';
    this.rg = '';
    this.cpf = '';
    this.cargo = '';
    this.setor = '';
    this.endereco = '';
    this.telefone = '';
    this.email = '';
    this.dataNascimento = new Date();
    this.dataAdmissao = new Date();
    this.dataDesligamento = new Date();
    this.motivoDesligamento = '';
    this.status = 'Ativo';
    this.fotoPerfil = '';
  }
}

export type ColaboradorStatus = 'Ativo' | 'Inativo' | 'Férias' | 'Licença' | 'Desligado';
