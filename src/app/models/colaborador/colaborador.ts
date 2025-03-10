export class Colaborador {
  id: number;
  matricula: string;
  nome: string;
  cargo: string;
  setor: string;
  endereco: string;
  telefone: string;
  email: string;
  dataNascimento: Date;
  dataAdmissao: Date;
  status: ColaboradorStatus;
  fotoPerfil?: string;

  constructor() {
    this.id = 0;
    this.matricula = '';
    this.nome = '';
    this.cargo = '';
    this.setor = '';
    this.endereco = '';
    this.telefone = '';
    this.email = '';
    this.dataNascimento = new Date();
    this.dataAdmissao = new Date();
    this.status = 'Ativo';
  }
}

export type ColaboradorStatus = 'Ativo' | 'Inativo' | 'Férias' | 'Licença' | 'Desligado';
