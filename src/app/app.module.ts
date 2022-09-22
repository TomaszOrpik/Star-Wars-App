import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { SWService } from './services/sw-api/sw-api.service';
import { MovieCardListComponent } from './components/movie-card-list/movie-card-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { MovieDetailsComponent } from './components/details/movie-details/movie-details.component';
import { CharacterDetailsComponent } from './components/details/character-details/character-details.component';
import { StarshipDetailsComponent } from './components/details/starship-details/starship-details.component';
import { PlanetDetailsComponent } from './components/details/planet-details/planet-details.component';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { routes } from './router/routes';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardListComponent,
    MovieCardComponent,
    SearchComponent,
    DetailsComponent,
    MovieDetailsComponent,
    CharacterDetailsComponent,
    StarshipDetailsComponent,
    PlanetDetailsComponent,
    LoginComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    { provide: 'PlanetService', useClass: SWService },
    {
      provide: 'CharacterService',
      useClass: SWService,
    },
    { provide: 'StarshipService', useClass: SWService },
    {
      provide: 'MovieService',
      useClass: SWService,
    },
    {
      provide: 'MoviesService',
      useClass: SWService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
