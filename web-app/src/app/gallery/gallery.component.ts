import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StoryService } from '../services/story.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  cards: any[] = [];
  currentLanguage: string = 'en'; // Default language is English
  isRightToLeft: boolean = false; // Default direction is left-to-right

  constructor(
      private router: Router,
      private storyService: StoryService,
      private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translationService.languageChanged.subscribe(() => {
      this.loadCards();
    });
    this.loadCards();
  }

  navigateToArticleComponent(id: number) {
    this.router.navigate(['/article', id]); // Assuming your route for ArticleComponent is '/article/:id'
  }

  loadCards() {
    const lang = this.translationService.getCurrentLanguage();
    console.log(lang,'wpüklspwklswkl')
    this.storyService.getStoryIds().subscribe((ids: number[]) => {
      const requests = ids.map(id => {
        console.log(id, 'ddpekdkwepokd'); // Log the id before making the request
        return this.storyService.getStory(id, lang);
      });

      forkJoin(requests).subscribe(
          (responses: any[]) => {
            this.cards = responses.filter(data => data); // Filter out any null or undefined responses
            this.updateDirection(lang); // Update direction based on language
          },
          (error: any) => {
            console.error('Error loading cards:', error);
          }
      );
    });
  }

  // Function to update direction based on language
  updateDirection(lang: string) {
    // Check if language is Arabic
    if (lang === 'ar') {
      this.isRightToLeft = true; // Set direction to right-to-left
    } else {
      this.isRightToLeft = false; // Set direction to left-to-right
    }
  }
}
