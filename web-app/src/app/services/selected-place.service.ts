import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SelectedPlaceService {
    selectedPlace: any = null;

    constructor() { }
}
