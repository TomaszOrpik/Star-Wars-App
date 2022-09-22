import { Component, Input } from '@angular/core';
import { MoviesFacade } from '../../facades/movies/movies.facade';
import { MovieResponseModel } from '../../models/movie-response.model';
import { Movie } from '../../models/movie.model';
import { DetailsStrategy } from '../../strategies/details/details.strategy';

@Component({
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  selector: 'app-movie-card',
})
export class MovieCardComponent {
  @Input('movie') movie: MovieResponseModel | undefined;

  movieModel: Movie | undefined;

  constructor(
    private readonly facade: MoviesFacade,
    private readonly detailsStrategy: DetailsStrategy
  ) {}

  onDetailsClicked(movie: MovieResponseModel) {
    this.detailsStrategy.getDetails(movie);
  }

  getPoster = (episodeId: number) => this.facade.getPoster(episodeId);
}
