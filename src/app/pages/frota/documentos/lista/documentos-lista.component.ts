import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { Carro } from '../../../../models/frota/carro';
import { Arquivo } from '../../../../models/ordem-de-servico/arquivo';

@Component({
  selector: 'app-documentos-lista',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule],
  templateUrl: './documentos-lista.component.html',
  styleUrls: ['./documentos-lista.component.css']
})
export class DocumentosListaComponent implements OnInit {
  veiculos: Carro[] = [];
  loading = true;
  searchTerm = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadVeiculos();
  }

  loadVeiculos() {
    this.dataService.getCarros().subscribe({
      next: (carros) => {
        this.veiculos = carros;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredVeiculos(): Carro[] {
    return this.veiculos.filter(veiculo => 
      veiculo.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      veiculo.modelo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getTotalDocumentos(veiculo: Carro): number {
    return veiculo.arqDocumentos?.length || 0;
  }

//   downloadDocumento(arquivo: File) {
//     // Implementar lógica de download
//     console.log('Baixando arquivo:', arquivo);
//   }

  downloadDocumento(doc: Arquivo) {
    // logic to download the document
    const file = new File([doc.content], doc.nome, { type: doc.type });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.nome;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
