import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header *ngIf="showHeader" class="header">
      <button 
        *ngIf="showBackButton" 
        class="back-button"
        (click)="goToMenu()">
        <i class="material-icons">arrow_back</i>
        <!-- <span>Menu Principal</span> -->
      </button>

      <div class="search-box">
        <i class="material-icons">search</i>
        <input 
          type="text" 
          [placeholder]="getPlaceholder()"
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
      position: fixed;
      top: 0;
      right: 0;
      left: 60px;
      height: 64px;
      z-index: 1001;
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: left 0.3s ease;
    }

    :host-context(.menu-expanded) .header {
      left: 240px;
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

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background-color: #ff9248;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .back-button:hover {
      background-color: #ffaa70;
      transform: translateX(-3px);
    }

    .back-button i {
      font-size: 1.2rem;
    }

    .search-box {
      margin-left: 1rem;
    }
  `]
})
export class HeaderComponent {
  searchValue: string = '';
  showHeader = false;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Only show header in dashboard routes
        this.showHeader = event.url.endsWith('/dashboard');
      }
    });
  }

  get showBackButton(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/dashboard' && currentRoute.startsWith('/dashboard/');
  }

  getPlaceholder(): string {
    return this.router.url.includes('/dashboard/ordens') 
      ? 'Pesquisar OS por número, GLPI, status ou data...'
      : 'Buscar funcionalidade...';
  }

  onSearch(value: string) {
    this.searchValue = value;
    this.searchService.updateSearch(value);
  }

  goToMenu() {
    this.router.navigate(['/dashboard']);
  }
}
