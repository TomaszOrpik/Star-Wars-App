import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CharacterAdapter } from '../../adapters/character/character.adapter';
import { MovieAdapter } from '../../adapters/movie/movie.adapter';
import { PlanetAdapter } from '../../adapters/planet/planet.adapter';
import { StarshipAdapter } from '../../adapters/starship/starship.adapter';
import { CharacterResponseModel } from '../../models/character-response.model';
import { Character } from '../../models/character.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { Movie } from '../../models/movie.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { Planet } from '../../models/planet.model';
import { StarshipResponseModel } from '../../models/starship-response.model';
import { Starship } from '../../models/starship.model';
import { SWService } from '../../services/sw-api/sw-api.service';
import { IDetailsStrategy } from './details.strategy.interface';

type DetailsType = 'none' | 'movie' | 'planet' | 'character' | 'starship';

@Injectable({
  providedIn: 'root',
})
export class DetailsStrategy implements IDetailsStrategy {
  readonly currentDetails = new BehaviorSubject<
    Movie | Character | Starship | Planet | undefined
  >(undefined);
  readonly isDetailsOpen = new BehaviorSubject<boolean>(false);
  readonly isDetailsLoading = new BehaviorSubject<boolean>(false);
  readonly detailsType = new BehaviorSubject<DetailsType>('none');
  readonly title = new BehaviorSubject<string>('none');

  constructor(
    @Inject('MovieService')
    private readonly movieService: SWService<MovieResponseModel>,
    @Inject('PlanetService')
    private readonly planetService: SWService<PlanetResponseModel>,
    @Inject('CharacterService')
    private readonly characterService: SWService<CharacterResponseModel>,
    @Inject('StarshipService')
    private readonly starshipService: SWService<StarshipResponseModel>
  ) {}

  async getDetails(
    responseModel:
      | MovieResponseModel
      | PlanetResponseModel
      | CharacterResponseModel
      | StarshipResponseModel
  ) {
    this.isDetailsLoading.next(true);
    this.isDetailsOpen.next(true);
    if ((responseModel as MovieResponseModel).title) {
      await this.getMovieDetails(responseModel as MovieResponseModel);
    }
    if ((responseModel as PlanetResponseModel).climate) {
      await this.getPlanetDetails(responseModel as PlanetResponseModel);
    }
    if ((responseModel as CharacterResponseModel).gender) {
      await this.getCharacterDetails(responseModel as CharacterResponseModel);
    }
    if ((responseModel as StarshipResponseModel).starship_class) {
      await this.getStarshipDetails(responseModel as StarshipResponseModel);
    }
    this.isDetailsLoading.next(false);
    return;
  }

  clearDetails() {
    this.isDetailsOpen.next(false);
    this.currentDetails.next(undefined);
  }

  private async getMovieDetails(movie: MovieResponseModel) {
    this.detailsType.next('movie');
    this.title.next(`Episode ${movie.episode_id}: ${movie.title}`);
    const planets = await this.planetService.loadData(movie.planets);
    const starships = await this.starshipService.loadData(movie.starships);
    const characters = await this.characterService.loadData(movie.characters);
    const movieModel = MovieAdapter.toModel(
      movie,
      planets,
      starships,
      characters
    );
    this.currentDetails.next(movieModel);
  }

  private async getPlanetDetails(planet: PlanetResponseModel) {
    this.detailsType.next('planet');
    this.title.next(planet.name);
    const residents = await this.characterService.loadData(planet.residents);
    const films = await this.movieService.loadData(planet.films);
    const planetModel = PlanetAdapter.toModel(planet, films, residents);
    this.currentDetails.next(planetModel);
  }

  private async getCharacterDetails(character: CharacterResponseModel) {
    this.detailsType.next('character');
    this.title.next(character.name);
    const homeworld = (
      await this.planetService.loadData([character.homeworld])
    )[0];
    const films = await this.movieService.loadData(character.films);
    const starships = await this.starshipService.loadData(character.starships);
    const characterModel = CharacterAdapter.toModel(
      character,
      homeworld,
      films,
      starships
    );
    this.currentDetails.next(characterModel);
  }

  private async getStarshipDetails(starship: StarshipResponseModel) {
    this.detailsType.next('starship');
    this.title.next(starship.name);
    const films = await this.movieService.loadData(starship.films);
    const pilots = await this.characterService.loadData(starship.pilots);
    const starshipModel = StarshipAdapter.toModel(starship, films, pilots);
    this.currentDetails.next(starshipModel);
  }
}
