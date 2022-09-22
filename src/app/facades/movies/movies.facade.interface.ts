export abstract class IMoviesFacade {
  abstract getPoster(episodeId: number): string;
  abstract getMovies(): Promise<void>;
}
