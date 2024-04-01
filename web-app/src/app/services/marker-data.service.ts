import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MarkerDataService {
    private placesDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    placesData$: Observable<any[]> = this.placesDataSubject.asObservable();

    constructor() { }

    setPlacesData(places: any[]): void {
        this.placesDataSubject.next(places);
    }

    getPlacesData(): Observable<any[]> {
        return this.placesData$;
    }
}
