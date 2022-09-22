import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../../models/character.model';
import { MovieResponseModel } from '../../../models/movie-response.model';
import { PlanetResponseModel } from '../../../models/planet-response.model';
import { StarshipResponseModel } from '../../../models/starship-response.model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['../details-shared.scss'],
})
export class CharacterDetailsComponent {
  @Input('character') character?: Character;
  @Output('selectedItem') selectedItem: EventEmitter<
    MovieResponseModel | PlanetResponseModel | StarshipResponseModel
  > = new EventEmitter();

  handleSelection = (
    item: MovieResponseModel | PlanetResponseModel | StarshipResponseModel
  ) => this.selectedItem.emit(item);
}
