import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { DataService } from '../services/data.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css'],
})
export class ImageCardComponent implements OnInit {
  images: { image: string, text: string }[] = [];
  mainText: string[] = [];

  constructor(private dialog: MatDialog, private dataService: DataService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: { items: { image: string, text: string }[], mainText: string[] }) => {
      this.images = data.items;
      this.mainText = data.mainText;
    });
  }

  openImageModal(imageUrl: string): void {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
      panelClass: 'custom-dialog'
    });
  }
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
