import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ferramenta, StatusFerramenta } from '../../../models/ferramenta/ferramenta';
import { DataService } from '../../../services/data.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckoutDialogComponent } from '../../../components/checkout-dialog/checkout-dialog.component';
import { Colaborador } from '../../../models/colaborador/colaborador';
import { EmprestimoFerramenta } from '../../../models/ferramenta/emprestimo-ferramenta';

@Component({
  selector: 'app-inventario-coletivo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, CheckoutDialogComponent],
  templateUrl: './inventario-coletivo.component.html',
  styleUrls: ['./inventario-coletivo.component.css']
})
export class InventarioColetivoComponent implements OnInit {
  ferramentas: Ferramenta[] = [];
  loading = false;
  searchTerm = '';
  selectedCategory = 'Todas';
  categories = ['Todas', 'Mecânica', 'Elétrica', 'Medição'];
  showErrorIcon = Array(this.ferramentas.length).fill(false);
  showCheckoutDialog = false;
  selectedFerramenta?: Ferramenta;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFerramentas();
  }

  loadFerramentas(): void {
    this.loading = true;
    this.dataService.getFerramentas().subscribe({
      next: (ferramentas) => {
        this.ferramentas = ferramentas;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar ferramentas', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  get filteredFerramentas(): Ferramenta[] {
    return this.ferramentas.filter(ferramenta => {
      const matchesSearch = ferramenta.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          ferramenta.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todas' || ferramenta.categoria === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getStatusIcon(status: StatusFerramenta): string {
    switch (status) {
      case 'disponivel': return 'check_circle';
      case 'em_uso': return 'person';
      case 'manutencao': return 'build';
      default: return 'help';
    }
  }

  getStatusText(status: StatusFerramenta): string {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'em_uso': return 'Em uso';
      case 'manutencao': return 'Em manutenção';
      default: return 'Status desconhecido';
    }
  }

  handleImageError(i: number): void {
    // container.style.backgroundColor = '#ddd';
    this.showErrorIcon[i] = true;
  }

  openCheckoutDialog(ferramenta: Ferramenta) {
    this.selectedFerramenta = ferramenta;
    this.showCheckoutDialog = true;
  }

  handleCheckout(event: { colaborador: Colaborador; quantidade: number; observacoes: string }) {
    if (this.selectedFerramenta) {
      // Update quantities
      this.selectedFerramenta.quantidadeDisponivel = (this.selectedFerramenta.quantidadeDisponivel || this.selectedFerramenta.quantidade) - event.quantidade;
      this.selectedFerramenta.quantidadeEmUso = (this.selectedFerramenta.quantidadeEmUso || 0) + event.quantidade;
      
      // Update status if all items are checked out
      if (this.selectedFerramenta.quantidadeDisponivel === 0) {
        this.selectedFerramenta.status = 'em_uso';
      }

      // Add to history
      const historicoItem: EmprestimoFerramenta = {
        id: Math.random() * 1000,
        responsavel: event.colaborador,
        dataRetirada: new Date(),
        dataDevolucao: new Date(),
        ferramenta: this.selectedFerramenta,
        observacoes: event.observacoes,
        devolvido: false,
        quantidade: Math.random() * 10
      };

      this.selectedFerramenta.historicoDeUso.push(historicoItem);
      this.selectedFerramenta.historicoDeUso[this.selectedFerramenta.historicoDeUso.length].responsavel = event.colaborador;
      
      this.showCheckoutDialog = false;
      this.selectedFerramenta = undefined;
    }
  }

  onNovaFerramenta() {
    this.router.navigate(['/dashboard/inventario/novo']);
  }
  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
