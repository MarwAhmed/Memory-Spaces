import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs'; // Import Observable and Subscription from 'rxjs'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  aboutTitle: string = '';
  aboutDescription: string = '';
  private languageChangeSubscription!: Subscription; // Add definite assignment assertion operator

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.updateTranslations();

    // Subscribe to language change events
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateTranslations();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from language change events
    this.languageChangeSubscription.unsubscribe();
  }

  updateTranslations(): void {
    this.getTranslation('title').subscribe((title: string) => {
      this.aboutTitle = title;
    });

    this.getTranslation('description').subscribe((description: string) => {
      this.aboutDescription = description;
    });
  }

  getTranslation(key: string): Observable<string> {
    return this.translate.get(`app.about.${key}`);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
