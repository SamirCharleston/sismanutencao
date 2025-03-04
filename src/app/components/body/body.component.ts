import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  @Input() menuItems: any[] = [];
  filteredItems: any[] = [];

  constructor(private searchService: SearchService) {
    this.searchService.searchTerm$.subscribe(term => {
      if (!term) {
        this.filteredItems = this.menuItems;
      } else {
        this.filteredItems = this.menuItems.filter(item =>
          item.label.toLowerCase().includes(term.toLowerCase())
        );
      }
    });
  }

  ngOnInit() {
    this.filteredItems = this.menuItems;
  }
}
