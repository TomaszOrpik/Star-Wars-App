import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterResponseModel } from 'src/app/models/character-response.model';
import { MovieResponseModel } from 'src/app/models/movie-response.model';
import { Starship } from 'src/app/models/starship.model';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['../details-shared.scss'],
})
export class StarshipDetailsComponent {
  @Input('starship') starship?: Starship;
  @Output('selectedItem') selectedItem: EventEmitter<
    MovieResponseModel | CharacterResponseModel
  > = new EventEmitter();

  handleSelection = (item: MovieResponseModel | CharacterResponseModel) =>
    this.selectedItem.emit(item);
}
