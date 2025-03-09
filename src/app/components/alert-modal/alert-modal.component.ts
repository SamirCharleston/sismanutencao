import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  @Input() show = false;
  @Input() title = 'Alerta';
  @Input() message = '';
  @Input() buttonText = 'OK';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
