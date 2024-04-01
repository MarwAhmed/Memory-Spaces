import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private dataUrl = '../assets/json-data/Nuri.json'; // Adjust the path accordingly

    constructor(private http: HttpClient) {}

    getData(): Observable<any> {
        return this.http.get<any>(this.dataUrl);
    }
}