import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    private languageChangedSubject: Subject<void> = new Subject<void>();
    private currentLanguage: string = 'en'; // Default language is English

    constructor(private translateService: TranslateService) {}

    // Method to set the language
    setLanguage(language: string): void {
        // Set the language using TranslateService
        this.translateService.use(language);
        // Update the current language
        this.currentLanguage = language;
        // Emit a signal that the language has changed
        this.languageChangedSubject.next();
    }

    getCurrentLanguage(): string {
        // Return the current language
        return this.currentLanguage;
    }

    translate(key: string, lang?: string): Observable<string> {
        // Translate a key using TranslateService
        return this.translateService.get(key, lang);
    }

    // Expose an observable for components to subscribe to language changes
    get languageChanged(): Observable<void> {
        return this.languageChangedSubject.asObservable();
    }
}
