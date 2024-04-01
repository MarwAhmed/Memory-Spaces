import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  template: `
    <button mat-icon-button (click)="closeModal()" style="position: absolute; top: 5px; right: 5px;color: white">
     x
    </button>
    <img [src]="data.imageUrl" alt="Large Image" (click)="closeModal()" style="cursor: pointer;">
    \`,
  `,
})
export class ImageModalComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
      public dialogRef: MatDialogRef<ImageModalComponent>
  ) {}
  closeModal(): void {
    this.dialogRef.close();
  }
}
