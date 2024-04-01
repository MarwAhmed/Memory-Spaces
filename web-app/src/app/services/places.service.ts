import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; // Import map operator explicitly

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    constructor(private http: HttpClient) {}

    getPlaces(language: string): Observable<any[]> {
        return this.http.get<any>('../assets/i18n/' + language + '.json').pipe(
            map((data: any) => Object.values(data.places)) // Provide type annotation for data
        );
    }
}
