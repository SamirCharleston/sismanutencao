import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordem-sort',
  standalone: true,
  imports: [CommonModule],
  template: `
      <!-- <span>Ordenar por</span> -->
    <div class="sort-container">
      <div class="sort-header">
        <i class="material-icons">sort</i>
        <span>Ordenar por</span>
      </div>
      <div class="sort-options">
        <button (click)="sort('numero')" [class.active]="currentSort === 'numero'">
          <i class="material-icons">{{getSortIcon('numero')}}</i>
          Número OS
        </button>
        <button (click)="sort('data')" [class.active]="currentSort === 'data'">
          <i class="material-icons">{{getSortIcon('data')}}</i>
          Data
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sort-container {
      position: fixed;
      top: calc(64px + 1rem);
      right: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 1rem;
      z-index: 1000;
      opacity: 0.3;
      transition: all 0.3s ease;
    }

    .sort-container:hover {
      opacity: 1;
    }

    .sort-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }

    .sort-options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border: none;
      background: none;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 4px;
      width: 100%;
      text-align: left;
    }

    button:hover {
      background: #f0f0f0;
      color: #ff9248;
    }

    button.active {
      color: #ff9248;
      background: #fff1e6;
    }

    .material-icons {
      font-size: 1.2rem;
    }
  `]
})
export class OrdemSortComponent {
  @Output() sortChange = new EventEmitter<{field: string, direction: 'asc' | 'desc'}>();
  
  currentSort: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(field: string) {
    if (this.currentSort === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = field;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({ field, direction: this.sortDirection });
  }

  getSortIcon(field: string): string {
    if (this.currentSort !== field) return 'sort';
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }
}
