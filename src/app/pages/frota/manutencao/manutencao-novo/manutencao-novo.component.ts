import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { CarroManutencao, TipoManutencao } from '../../../../models/frota/carro-manutencao';

@Component({
  selector: 'app-manutencao-novo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './manutencao-novo.component.html',
  styleUrls: ['./manutencao-novo.component.css']
})
export class ManutencaoNovoComponent {
  manutencaoForm: FormGroup;
  carros$;
  
  tiposManutencao: TipoManutencao[] = ['preventiva', 'corretiva', 'revisao', 'troca_oleo'];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.carros$ = this.dataService.getCarros();
    this.manutencaoForm = this.fb.group({
      carro: ['', Validators.required],
      tipo: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      quilometragem: ['', [Validators.required, Validators.min(0)]],
      descricao: ['', Validators.required],
      oficina: ['', Validators.required],
      custo: [0, [Validators.required, Validators.min(0)]],
      notaFiscal: [''],
      observacoes: [''],
      itensServico: this.fb.array([])
    });
  }

  addItemServico() {
    const itemGroup = this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]]
    });

    (this.manutencaoForm.get('itensServico') as FormArray).push(itemGroup);
  }

  removeItemServico(index: number) {
    (this.manutencaoForm.get('itensServico') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.manutencaoForm.valid) {
      const novaManutencao: CarroManutencao = {
        ...this.manutencaoForm.value,
        id: Date.now(),
        status: 'pendente',
      };

      // Here you would call the service to save the maintenance record
      console.log('Nova manutenção:', novaManutencao);
      this.router.navigate(['/dashboard/frota/manutencoes']);
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/frota/manutencoes']);
  }
}
