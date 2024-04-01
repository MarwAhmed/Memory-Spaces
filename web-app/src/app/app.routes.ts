// app.routes.ts

import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { MapComponent } from './map/map.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { MapDeactivateGuard, MapActivateGuard } from './services/map-guard.service'; // Import MapDeactivateGuard
import {ArticleComponent} from './article/article.component'
export const appRoutes: Route[] = [
    { path: 'about', component: AboutComponent, data: { translationKey: 'about' } },
    { path: 'project', component: ProjectComponent, data: { translationKey: 'project' } },
    { path: 'map', component: MapComponent, data: { translationKey: 'map' } }, // Ensure MapDeactivateGuard is imported and provided
    { path: 'gallery', component: GalleryComponent, data: { translationKey: 'gallery' } },
    { path: 'image-card-component', component: ImageCardComponent, data: { translationKey: 'imageCard' } },
    { path: 'article/:id', component: ArticleComponent, data: { translationKey: 'article' } },


    // Add more route configuration
];
