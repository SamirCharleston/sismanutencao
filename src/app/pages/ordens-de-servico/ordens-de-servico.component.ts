import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ordens-de-servico',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './ordens-de-servico.component.html',
  styleUrls: ['./ordens-de-servico.component.css']
})
export class OrdensDeServicoComponent implements OnInit, OnDestroy {
  allOrdens: OrdemDeServico[] = [
    ...Array.from({ length: 15 }, (_, i) => {
      const os = new OrdemDeServico();
      os.id = i + 1;
      os.glpi = 123450 + i;
      os.numero = `2023${(i + 1).toString().padStart(3, '0')}`;
      os.dataFim = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      os.status = this.getRandomStatus();
      return os;
    }),
    // Adicionando algumas ordens com datas futuras e não concluídas
    {
      id: 16,
      numero: '2023016',
      glpi: 123455,
      dataFim: new Date(2024, 2, 15),
      status: 'Em andamento'
    } as OrdemDeServico,
    {
      id: 17,
      numero: '2023017',
      glpi: 123456,
      dataFim: new Date(2024, 3, 4),
      status: 'Pendente'
    } as OrdemDeServico,
    {
      id: 18,
      numero: '2023018',
      glpi: 123457,
      dataFim: new Date(2024, 1, 28),
      status: 'Em análise'
    } as OrdemDeServico
  ];
  ordensDeServico: OrdemDeServico[] = [];
  private searchSubscription: Subscription;

  constructor(private searchService: SearchService) {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.filterOrdens(term);
    });
  }

  ngOnInit() {
    this.ordensDeServico = this.allOrdens;
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private filterOrdens(term: string) {
    if (!term) {
      this.ordensDeServico = this.allOrdens;
      return;
    }

    term = term.toLowerCase();
    this.ordensDeServico = this.allOrdens.filter(os => 
      os.numero.toLowerCase().includes(term) ||
      os.glpi.toString().includes(term) ||
      os.status.toLowerCase().includes(term) ||
      (os.dataFim && os.dataFim.toLocaleDateString().includes(term))
    );
  }

  private getRandomStatus(): string {
    const status = ['Concluída', 'Em andamento', 'Pendente', 'Em análise'];
    return status[Math.floor(Math.random() * status.length)];
  }

  isOverdue(os: OrdemDeServico): boolean {
    const today = new Date();
    return os.dataFim < today && os.status !== 'Concluída';
  }
}
