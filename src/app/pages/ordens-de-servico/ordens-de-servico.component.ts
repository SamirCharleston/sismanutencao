import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';

@Component({
  selector: 'app-ordens-de-servico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordens-de-servico.component.html',
  styleUrls: ['./ordens-de-servico.component.css']
})
export class OrdensDeServicoComponent {
  ordensDeServico: OrdemDeServico[] = Array.from({ length: 20 }, (_, i) => {
    const os = new OrdemDeServico();
    os.id = i + 1;
    os.numero = `2023${(i + 1).toString().padStart(3, '0')}`;
    os.dataFim = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toLocaleDateString('pt-BR');
    return os;
  });
}
