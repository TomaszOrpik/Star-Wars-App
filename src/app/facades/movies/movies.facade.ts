import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MovieResponseModel } from '../../models/movie-response.model';
import { MoviesResponseModel } from '../../models/movies-response.model';
import { PosterService } from '../../services/poster/poster.service';
import { SWService } from '../../services/sw-api/sw-api.service';
import { IMoviesFacade } from './movies.facade.interface';

@Injectable()
export class MoviesFacade implements IMoviesFacade {
  public movies = new BehaviorSubject([] as MovieResponseModel[]);

  constructor(
    private readonly posterService: PosterService,
    @Inject('MoviesService')
    private readonly moviesService: SWService<MoviesResponseModel>
  ) {}

  getPoster(episodeId: number) {
    return this.posterService.getPoster(episodeId);
  }

  async getMovies(): Promise<void> {
    const moviesResponse = await this.moviesService.loadData([
      'https://swapi.dev/api/films',
    ]);
    const movies = moviesResponse[0].results;
    movies.sort((a, b) => a.episode_id - b.episode_id);
    this.movies.next(movies);
  }
}
