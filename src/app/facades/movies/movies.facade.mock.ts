import { BehaviorSubject } from 'rxjs';
import { MovieResponseModel } from '../../models/movie-response.model';
import { createMockString } from '../../utils/string.utils';
import { IMoviesFacade } from './movies.facade.interface';

export class MoviesFacadeMock implements IMoviesFacade {
  public movies = new BehaviorSubject([] as MovieResponseModel[]);

  getPoster = (episodeId: number) => createMockString();
  getMovies = (): Promise<void> =>
    new Promise(() => {
      return;
    });
}
