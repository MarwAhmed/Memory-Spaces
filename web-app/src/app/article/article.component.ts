import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../services/story.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  storyId!: number;
  storyData: any;
  isRtl: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private storyService: StoryService,
      private translationService: TranslationService // Inject TranslationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storyId = +params['id'];
      this.loadStoryData(); // Load story data initially
      this.updateDirection();
      // Subscribe to language changes
      this.translationService.languageChanged.subscribe(() => {
        this.loadStoryData();
        this.updateDirection();// Reload story data when language changes
      });
    });
  }

  // Method to load story data based on the current language
  loadStoryData(): void {
    const lang = this.translationService.getCurrentLanguage();
    this.storyService.getStory(this.storyId, lang).subscribe(data => {
      this.storyData = data;
      this.storyData.topics.forEach((topic: any, index: number) => {
        topic.reverseDirection = index % 2 !== 0;
      });
    });
  }

  private updateDirection(): void {
    const lang = this.translationService.getCurrentLanguage();
    // Check if the language is Arabic
    this.isRtl = lang === 'ar';

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
