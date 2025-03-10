import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent as NgxImageCropperComponent, ImageCroppedEvent, LoadedImage, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-app-image-cropper',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  template: `
    <div class="modal-overlay" *ngIf="show" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Ajustar Imagem</h3>
          <button class="btn-close" (click)="onClose()">
            <i class="material-icons">close</i>
          </button>
        </div>

        <div class="cropper-container">
          <image-cropper
            [imageFile]="imageFile"
            [maintainAspectRatio]="true"
            [aspectRatio]="1"
            [roundCropper]="true"
            [resizeToWidth]="300"
            format="png"
            (imageCropped)="imageCropped($event)"
            (loadImageFailed)="loadImageFailed()">
          </image-cropper>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" (click)="onClose()">Cancelar</button>
          <button class="btn-primary" (click)="onSave()" [disabled]="!croppedImage">
            Salvar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .btn-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
    }

    .cropper-container {
      padding: 1rem;
      height: 400px;
      overflow: hidden;
    }

    .modal-footer {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      border-top: 1px solid #eee;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      border: none;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #ff9248;
      color: white;
    }

    .btn-primary:hover {
      background: #ff8030;
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }
  `]
})
export class AppImageCropperComponent {
  @Input() show = false;
  @Input() imageFile: File | undefined = undefined;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  croppedImage: string | null = null;

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 || null;
  }

  loadImageFailed() {
    console.error('Failed to load image');
  }

  onClose() {
    this.croppedImage = null;
    this.close.emit();
  }

  onSave() {
    if (this.croppedImage) {
      this.save.emit(this.croppedImage);
    }
  }
}
