import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoryService {
    constructor(private http: HttpClient) {}

    // Method to get story data based on story ID and language
    getStory(id: number, lang: string): Observable<any> {
        console.log(id,lang )
        const filename = `story-${id}-${lang}.json`;
        return this.http.get<any>(`../assets/story/stories/${filename}`);
    }

    // Method to get list of story IDs
    getStoryIds(): Observable<number[]> {
        return this.http.get<number[]>('../assets/story/storyIds.json');
    }

    // Method to get translation data based on translation key and language
    getTranslation(key: string, language: string): Observable<string> {
        const url = `assets/translations/${language}/${key}.json`;
        return this.http.get(url, { responseType: 'text' });
    }
}
