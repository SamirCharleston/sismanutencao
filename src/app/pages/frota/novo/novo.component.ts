import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Carro } from '../../../models/frota/carro';

@Component({
  selector: 'app-novo-veiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoVeiculoComponent {
  veiculoForm: FormGroup;
  tiposCombustivel = ['Gasolina', 'Etanol', 'Diesel', 'Flex', 'GNV'];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.veiculoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern('^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$')]],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      quilometragem: [0, [Validators.required, Validators.min(0)]],
      combustivel: ['Flex', Validators.required],
      renavam: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      chassi: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      setor: [''],
      motorista: [''],
      imagemUrl: [''],
      ultimaManutencao: [''],
      proxManuProgramada: ['']
    });
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      const novoVeiculo: Carro = {
        ...this.veiculoForm.value,
        id: Date.now(),
        status: 'disponivel'
      };

      // Aqui você chamaria o serviço para salvar o veículo
      console.log('Novo veículo:', novoVeiculo);
      this.router.navigate(['/dashboard/frota']);
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/frota']);
  }
}
