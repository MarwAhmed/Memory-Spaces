// In TranslationPipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { TranslationService } from './translation.service';

@Pipe({
    name: 'translate'
})
export class TranslationPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {}

    transform(key: string): Observable<string> {
        console.log('TranslationPipe invoked with key:', key);
        return this.translationService.translate(key);
    }
}
