import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdemDeServico } from '../../../models/ordem-de-servico/ordem-de-servico';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import { OrdemSortComponent } from '../../../components/ordem-sort/ordem-sort.component';
import { DataService } from '../../../services/data.service';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordens-de-servico',
  standalone: true,
  imports: [CommonModule, OrdemSortComponent, LoadingSpinnerComponent],
  providers: [DatePipe],
  templateUrl: './ordens-de-servico.component.html',
  styleUrls: ['./ordens-de-servico.component.css']
})
export class OrdensDeServicoComponent implements OnInit, OnDestroy {
  allOrdens: OrdemDeServico[] = [];
  ordensDeServico: OrdemDeServico[] = [];
  displayedOrdens: OrdemDeServico[] = [];
  private searchSubscription: Subscription;
  private page = 1;
  private pageSize = 10;
  private initialLoad = 15;
  isLoading = false;

  constructor(
    private searchService: SearchService,
    private dataService: DataService,
    private router: Router
  ) {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.filterOrdens(term);
    });
  }

  ngOnInit() {
    this.allOrdens = this.dataService.getOrdens();
    this.ordensDeServico = this.allOrdens;
    this.loadInitialOrdens();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private loadInitialOrdens() {
    this.displayedOrdens = this.ordensDeServico.slice(0, this.initialLoad);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isLoading) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    if (windowHeight + scrollTop >= documentHeight - 300) {
      this.loadMore();
    }
  }

  private async loadMore() {
    if (this.displayedOrdens.length >= this.ordensDeServico.length) return;
    
    this.isLoading = true;
    
    // Simular delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const start = this.displayedOrdens.length;
    const end = start + this.pageSize;
    const newOrdens = this.ordensDeServico.slice(start, end);
    this.displayedOrdens = [...this.displayedOrdens, ...newOrdens];
    this.page++;
    
    this.isLoading = false;
  }

  private filterOrdens(term: string) {
    if (!term) {
      this.ordensDeServico = this.allOrdens;
    } else {
      term = term.toLowerCase();
      this.ordensDeServico = this.allOrdens.filter(os => 
        os.numero.toLowerCase().includes(term) ||
        os.glpi.toString().includes(term) ||
        os.status.toLowerCase().includes(term) ||
        (os.dataFim && os.dataFim.toLocaleDateString().includes(term))
      );
    }
    // Reset pagination when filtering
    this.page = 1;
    this.loadInitialOrdens();
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
      } else if (sortEvent.field === 'status') {
        return modifier * a.status.localeCompare(b.status);
      }
      return 0;
    });
    
    this.ordensDeServico = sortedOrdens;
    this.loadInitialOrdens();
  }

  navigateToDetails(ordem: OrdemDeServico) {
    this.router.navigate(['/dashboard/ordens', ordem.numero]);
  }

  onNovaOrdem() {
    this.router.navigate(['/dashboard/ordens/novo']);
  }
}
