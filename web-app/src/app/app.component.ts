import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/translation.service'; // Import the TranslationService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'web-app';
  isEnglish: boolean = true; // Default language is English

  constructor(
      private router: Router,
      private translationService: TranslationService // Inject TranslationService
  ) {}

  ngOnInit() {
    this.toggleLanguage(!this.isEnglish);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  toggleLanguage(checked: boolean): void {
    const language = checked ? 'ar' : 'en'; // Determine the language based on the toggle state
    this.translationService.setLanguage(language); // Set the language using TranslationService
    this.isEnglish = !checked;
    this.updateDirection()// Update the language toggle state
  }

  private updateDirection(): void {
    const lang = this.translationService.getCurrentLanguage();
    // Check if the language is Arabic


    // Check if the language is English
    if (lang === 'en') {
      // Set direction to left-to-right
      document.dir = 'ltr';
    } else {
      // Set direction to right-to-left
      document.dir = 'rtl';
    }
  }
}
