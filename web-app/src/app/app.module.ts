import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProjectComponent } from './project/project.component';
import { MapComponent } from './map/map.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ImageCardComponent } from './image-card/image-card.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslationPipe } from './services/TranslationPipe';
import { ArticleComponent } from './article/article.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ProjectComponent,
    MapComponent,
    GalleryComponent,
    AboutComponent,
    ImageCardComponent,
    ImageModalComponent,
    TranslationPipe,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    MatTabsModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
