import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  constructor(private translate: TranslateService) {}

  getTranslation(key: string): string {
    return this.translate.instant(`pages.project.mainText.${key}`);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
    console.log(this.translate.currentLang)
  }
}
