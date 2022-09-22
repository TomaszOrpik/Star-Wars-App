import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterResponseModel } from 'src/app/models/character-response.model';
import { MovieResponseModel } from 'src/app/models/movie-response.model';
import { Planet } from 'src/app/models/planet.model';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['../details-shared.scss'],
})
export class PlanetDetailsComponent {
  @Input('planet') planet?: Planet;
  @Output('selectedItem') selectedItem: EventEmitter<
    MovieResponseModel | CharacterResponseModel
  > = new EventEmitter();

  handleSelection = (item: MovieResponseModel | CharacterResponseModel) =>
    this.selectedItem.emit(item);
}
