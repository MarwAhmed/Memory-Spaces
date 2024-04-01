import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { PlacesService } from '../services/places.service';
import * as L from 'leaflet';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
    private languageChangeSubscription!: Subscription;
    @ViewChild('map') mapElement!: ElementRef;
    map!: L.Map;
    translationKey: string = '';
    customIcon = L.icon({
        iconUrl: 'assets/icons/location-icon.png',
        iconSize: [25, 30],
        iconAnchor: [13, 41],
        popupAnchor: [0, -41]
    });

    places: any[] = [];
    selectedPlace: any = null;
    placeImageUrl: string = '';

    constructor(
        private translationService: TranslationService,
        private placesService: PlacesService,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.languageChangeSubscription = this.translationService.languageChanged.subscribe(() => {
            console.log('Language changed. Reloading places...');
            this.translationKey = this.translationService.getCurrentLanguage();
            console.log('Current language:', this.translationKey);
            this.loadPlaces(this.translationKey);
        });

        // Initialize places after setting the initial language
        this.translationKey = this.translationService.getCurrentLanguage();
        console.log('Initial language:', this.translationKey);
        this.loadPlaces(this.translationKey);
    }

    ngOnDestroy(): void {
        if (this.languageChangeSubscription) {
            this.languageChangeSubscription.unsubscribe();
        }

        if (this.map) {
            this.map.remove();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initMap();
        });
    }

    loadPlaces(language: string): void {
        console.log('the current language is ',language);
        this.placesService.getPlaces(language).subscribe(places => {
            this.places = places;
            console.log('Places loaded:', this.places);
            this.updateMarkers(); // Update markers when places are loaded
        });
    }

    initMap(): void {
        if (!this.map) {
            this.map = L.map('map').setView([36.3544, 43.1432], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        }
    }

    updateMarkers(): void {
        // Remove existing markers
        if (this.map) {
            this.map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    this.map.removeLayer(layer);
                }
            });
        }

        if(this.translationKey=='en')
        this.selectedPlace={name:'unselected place'};
        if(this.translationKey=='ar')
            this.selectedPlace={name:'لايوجد'};

        // Add new markers with updated translations
        this.places.forEach(place => {
            const marker = L.marker(place.coordinates as L.LatLngTuple, { icon: this.customIcon }).addTo(this.map);
            marker.bindPopup(`<b>${place.name}</b>`).on('click', () => {
                console.log('Marker clicked:', place);
                this.selectedPlace = place;
                console.log(this.selectedPlace)
                // Manually update selected place with translated content
                this.translatePlaceContent();
            });
        });
    }


    translatePlaceContent(): void {
        if (this.selectedPlace) {
            this.translationService.translate(this.selectedPlace.name).subscribe((translatedName: string) => {
                this.selectedPlace.name = translatedName;
            });
            this.translationService.translate(this.selectedPlace.description).subscribe((translatedDesc: string) => {
                this.selectedPlace.description = this.sanitizer.bypassSecurityTrustHtml(translatedDesc);
            });

            // You can similarly translate other properties if needed

            // Scroll to show the main-text container
            const mainTextContainer = this.elementRef.nativeElement.querySelector('.main-text');
            if (mainTextContainer) {
                mainTextContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        }
    }


}
