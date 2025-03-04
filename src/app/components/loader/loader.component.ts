import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  constructor(@Inject(LoaderService) public loaderService: LoaderService) {}
}
