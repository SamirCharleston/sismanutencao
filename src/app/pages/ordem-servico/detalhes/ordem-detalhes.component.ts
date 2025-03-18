import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { OrdemDeServico } from '../../../models/ordem-de-servico/ordem-de-servico';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { Item } from '../../../models/ordem-de-servico/item';
import { Arquivo } from '../../../models/ordem-de-servico/arquivo';

@Component({
  selector: 'app-ordem-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './ordem-detalhes.component.html',
  styleUrls: ['./ordem-detalhes.component.css']
})
export class OrdemDetalhesComponent implements OnInit {
  ordem: OrdemDeServico = new OrdemDeServico();
  isEditing = false;
  private originalOrdem: OrdemDeServico = new OrdemDeServico();
  showConfirmModal = false;
  modalTitle = '';
  modalMessage = '';
  modalConfirmText = '';
  private modalAction: (() => void) | null = null;
  editingItemIndex: number = -1;
  editingItem: Item | null = null;
  private currentSort = {
    column: '',
    direction: 'asc'
  };
  sortFields = [
    { label: 'Descrição', value: 'descricao' },
    { label: 'Unidade', value: 'unidade' },
    { label: 'Quantidade', value: 'quantidade' },
    { label: 'Valor Unit.', value: 'valorUnitario' },
    { label: 'Total', value: 'total' }
  ];
  isDragging = false;
  fileList: Arquivo[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ordens = this.dataService.getOrdens();
      this.ordem = ordens.find(o => o.numero === params['numero']) as OrdemDeServico;
    });
  }

  onEdit() {
    this.isEditing = true;
    this.originalOrdem = { ...this.ordem, id: this.ordem?.id ?? 0 };
    //Copia os arquivos que ja estao no objeto
    this.ordem.arquivos = this.ordem.arquivos?.map(arquivo => ({ ...arquivo }));
  }

  onSave() {
    this.showConfirmModal = true;
    this.modalTitle = 'Salvar Alterações';
    this.modalMessage = 'Deseja salvar as alterações?';
    this.modalConfirmText = 'Salvar';
    this.modalAction = () => {
      this.isEditing = false;
      console.log('Salvando alterações:', this.ordem);
      // Aqui você implementaria a lógica para salvar no backend
    };
  }

  onCancel() {
    this.ordem = { ...this.originalOrdem };
    this.isEditing = false;
  }

  onDelete() {
    this.showConfirmModal = true;
    this.modalTitle = 'Excluir Ordem de Serviço';
    this.modalMessage = `Tem certeza que deseja excluir a OS ${this.ordem?.numero}?`;
    this.modalConfirmText = 'Excluir';
    this.modalAction = () => {
      console.log('Excluir OS:', this.ordem?.numero);
      // Implement delete logic
    };
  }

  onReview() {
    console.log('Revisar OS:', this.ordem?.numero);
  }

  onComplete() {
    if (this.ordem && this.ordem.status !== 'Concluída') {
      this.showConfirmModal = true;
      this.modalTitle = 'Concluir Ordem de Serviço';
      this.modalMessage = `Tem certeza que deseja concluir a OS ${this.ordem.numero}?`;
      this.modalConfirmText = 'Concluir';
      this.modalAction = () => {
        // Quando a OS é concluída, a data de conclusão é preenchida
        this.ordem.dataConclusao = new Date();
        this.ordem.status = 'Concluída';
      };
    }
  }

  onPrint() {
    console.log('Imprimir OS:', this.ordem?.numero);
    window.print();
  }

  onModalConfirm() {
    if (this.modalAction) {
      this.modalAction();
    }
    this.showConfirmModal = false;
    this.modalAction = null;
  }

  onModalCancel() {
    this.showConfirmModal = false;
    this.modalAction = null;
  }

  addItem() {
    const newItem = {
      descricao: '',
      unidade: '',
      quantidade: 0,
      valorUnitario: 0
    } as Item;
    
    this.ordem.itens = [...this.ordem.itens, newItem];
    this.editItem(this.ordem.itens.length - 1);
  }

  editItem(index: number) {
    this.editingItemIndex = index;
    this.editingItem = { ...this.ordem.itens[index] };
  }

  saveItem() {
    if (this.editingItem && this.editingItemIndex >= 0) {
      this.ordem.itens[this.editingItemIndex] = { ...this.editingItem };
      this.cancelEditItem();
    }
  }

  cancelEditItem() {
    this.editingItemIndex = -1;
    this.editingItem = null;
  }

  deleteItem(index: number) {
    this.showConfirmModal = true;
    this.modalTitle = 'Excluir Item';
    this.modalMessage = 'Tem certeza que deseja excluir este item?';
    this.modalConfirmText = 'Excluir';
    this.modalAction = () => {
      this.ordem.itens = this.ordem.itens.filter((_, i) => i !== index);
    };
  }

  sortItems(column: string) {
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }

    const modifier = this.currentSort.direction === 'asc' ? 1 : -1;

    this.ordem.itens.sort((a, b) => {
      if (column === 'total') {
        const totalA = a.quantidade * a.valorUnitario;
        const totalB = b.quantidade * b.valorUnitario;
        return (totalA - totalB) * modifier;
      }

      const key = column as keyof Item;
      if (typeof a[key] === 'string') {
        return (a[key] as string).localeCompare(b[key] as string) * modifier;
      }

      return ((a[key] as number) - (b[key] as number)) * modifier;
    });
  }

  getSortIcon(column: string): string {
    if (this.currentSort.column !== column) {
      return 'unfold_more';
    }
    return this.currentSort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  getFileIcon(tipo: string): string {
    const icons: { [key: string]: string } = {
      'pdf': 'picture_as_pdf',
      'image': 'image',
      'doc': 'description',
      'xls': 'table_chart',
      'zip': 'folder_zip',
      'default': 'insert_drive_file'
    };
    return icons[tipo] || icons['default'];
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.handleFiles(input.files);
  }

  private handleFiles(files: FileList) {
    if (!this.ordem.arquivos) this.ordem.arquivos = [];
    
    Array.from(files).forEach(file => {
      // Aqui você implementaria o upload real para o backend
      const arquivo: Arquivo = {
        nome: file.name,
        tipo: this.getFileType(file.name),
        tamanho: file.size,
        url: URL.createObjectURL(file),
        type: '', // Add appropriate value for 'type'
        content: new Blob() // Add appropriate value for 'content'
      };
      this.ordem.arquivos!.push(arquivo);
    });
  }

  private getFileType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const types: { [key: string]: string } = {
      'pdf': 'pdf',
      'jpg': 'image',
      'jpeg': 'image',
      'png': 'image',
      'doc': 'doc',
      'docx': 'doc',
      'xls': 'xls',
      'xlsx': 'xls',
      'zip': 'zip',
      'rar': 'zip'
    };
    return types[ext] || 'default';
  }

  downloadFile(arquivo: any) {
    // Implementacao do download dos arquivos
    const link = document.createElement('a');
    link.href = arquivo.url;
    link.download = arquivo.nome;
    link.click();
  }

  deleteFile(index: number) {
    this.showConfirmModal = true;
    this.modalTitle = 'Excluir Arquivo';
    this.modalMessage = 'Tem certeza que deseja excluir este arquivo?';
    this.modalConfirmText = 'Excluir';
    this.modalAction = () => {
      this.ordem.arquivos?.splice(index, 1);
    };
  }
}
