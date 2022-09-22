import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterResponseModel } from 'src/app/models/character-response.model';
import { Movie } from 'src/app/models/movie.model';
import { PlanetResponseModel } from 'src/app/models/planet-response.model';
import { StarshipResponseModel } from 'src/app/models/starship-response.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['../details-shared.scss'],
})
export class MovieDetailsComponent {
  @Input('movie') movie?: Movie;
  @Output('selectedItem') selectedItem: EventEmitter<
    CharacterResponseModel | PlanetResponseModel | StarshipResponseModel
  > = new EventEmitter();

  handleSelection = (
    item: CharacterResponseModel | PlanetResponseModel | StarshipResponseModel
  ) => this.selectedItem.emit(item);
}

