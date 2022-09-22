import { createMockNumber } from '../utils/number.utils';
import { createMockString } from '../utils/string.utils';
import {
  createMockMovieResponseModel,
  MovieResponseModel,
} from './movie-response.model';

export interface MoviesResponseModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: MovieResponseModel[];
}

export const createMockMoviesResponseModel = (
  props?: Partial<MoviesResponseModel>
): MoviesResponseModel => ({
  count: createMockNumber(),
  next: createMockString(),
  previous: createMockString(),
  results: [createMockMovieResponseModel()],
  ...props,
});
