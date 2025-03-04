import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdemDeServico } from '../../models/ordem-de-servico/ordem-de-servico';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { OrdemSortComponent } from '../../components/ordem-sort/ordem-sort.component';

@Component({
  selector: 'app-ordens-de-servico',
  standalone: true,
  imports: [CommonModule, OrdemSortComponent],
  providers: [DatePipe],
  template: `
    <div class="os-container">
      <app-ordem-sort (sortChange)="onSort($event)"></app-ordem-sort>
      <div class="os-grid">
        <div *ngFor="let os of ordensDeServico" class="os-card">
          <div class="warning-indicator" *ngIf="isOverdue(os)">
            <i class="material-icons">warning</i>
          </div>
          <div class="os-content">
            <div class="os-number">OS #{{os.numero}}</div>
            <div class="os-glpi">GLPI <b>{{os.glpi}}</b></div>
            <div class="os-date">Vencimento: <b>{{os.dataFim | date:'dd/MM/yyyy'}}</b></div>
            <div class="os-status">{{os.status}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
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

  onSort(sortEvent: {field: string, direction: 'asc' | 'desc'}) {
    const sortedOrdens = [...this.ordensDeServico];
    sortedOrdens.sort((a, b) => {
      const modifier = sortEvent.direction === 'asc' ? 1 : -1;
      
      if (sortEvent.field === 'numero') {
        return modifier * a.numero.localeCompare(b.numero);
      } else if (sortEvent.field === 'data') {
        return modifier * (a.dataFim.getTime() - b.dataFim.getTime());
      }
      return 0;
    });
    
    this.ordensDeServico = sortedOrdens;
  }
}
