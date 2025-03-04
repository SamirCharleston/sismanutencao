import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="header">
      <div class="search-box">
        <i class="material-icons">search</i>
        <input 
          type="text" 
          placeholder="Buscar funcionalidade..."
          [ngModel]="searchValue"
          (ngModelChange)="onSearch($event)">
      </div>
      <div class="user-info">
        <i class="material-icons">account_circle</i>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-box {
      display: flex;
      align-items: center;
      background: #f0f0f0;
      border-radius: 20px;
      padding: 0.5rem 1rem;
      margin: 0 1rem;
      flex: 1;
    }

    .search-box input {
      border: none;
      background: none;
      padding: 0.5rem;
      margin-left: 0.5rem;
      flex: 1;
      font-size: 0.9rem;
      color: #333;
    }

    .search-box input:focus {
      outline: none;
    }

    .search-box input::placeholder {
      color: #999;
    }

    .user-info {
      padding: 0.5rem;
      color: #666;
    }

    .material-icons {
      font-size: 1.5rem;
    }
  `]
})
export class HeaderComponent {
  searchValue: string = '';

  constructor(private searchService: SearchService) {}

  onSearch(value: string) {
    this.searchValue = value;
    this.searchService.updateSearch(value);
  }
}
