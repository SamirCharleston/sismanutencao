import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Ferramenta } from '../../../models/ferramenta/ferramenta';

@Component({
  selector: 'app-novo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent {
  ferramentaForm: FormGroup;
  categorias = ['Mecânica', 'Elétrica', 'Medição', 'Hidráulica'];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.ferramentaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      localizacao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      marca: ['', Validators.required],
      imagemUrl: ['']
    });
  }

  onSubmit() {
    if (this.ferramentaForm.valid) {
      const novaTool: Ferramenta = {
        ...this.ferramentaForm.value,
        id: Math.random() * 1000, // Temporary ID generation
        status: 'disponivel',
        dataAquisicao: new Date(),
        historicoDeUso: [],
        manutencao: false
      };

      // Here you would typically call a service to save the tool
      console.log('Nova ferramenta:', novaTool);
      this.router.navigate(['/dashboard/inventario']);
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/inventario']);
  }
}
