import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../../services/data.service';
import { Ferramenta } from '../../../models/ferramenta/ferramenta';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  ferramenta?: Ferramenta;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getFerramentaPorId(id).subscribe({
        next: (ferramenta) => {
          if (ferramenta) {
            this.ferramenta = ferramenta;
          } else {
            this.router.navigate(['/dashboard/inventario']);
          }
          this.loading = false;
        },
        error: () => {
          this.router.navigate(['/dashboard/inventario']);
          this.loading = false;
        }
      });
    }
  }

  onBack() {
    this.router.navigate(['/dashboard/inventario']);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'unavailable':
        return 'Indisponível';
      case 'maintenance':
        return 'Em Manutenção';
      default:
        return 'Desconhecido';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'available':
        return 'check_circle';
      case 'unavailable':
        return 'cancel';
      case 'maintenance':
        return 'build';
      default:
        return 'help';
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/default-image.png'; // Provide a default image path
  }
}
