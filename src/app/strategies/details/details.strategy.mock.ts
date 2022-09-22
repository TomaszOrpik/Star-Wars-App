import { BehaviorSubject } from 'rxjs';
import { CharacterResponseModel } from '../../models/character-response.model';
import { Character } from '../../models/character.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { Movie } from '../../models/movie.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { Planet } from '../../models/planet.model';
import { StarshipResponseModel } from '../../models/starship-response.model';
import { Starship } from '../../models/starship.model';
import { IDetailsStrategy } from './details.strategy.interface';

type DetailsType = 'none' | 'movie' | 'planet' | 'character' | 'starship';

export class DetailsStrategyMock implements IDetailsStrategy {
  readonly currentDetails = new BehaviorSubject<
    Movie | Character | Starship | Planet | undefined
  >(undefined);
  readonly isDetailsOpen = new BehaviorSubject<boolean>(false);
  readonly isDetailsLoading = new BehaviorSubject<boolean>(false);
  readonly detailsType = new BehaviorSubject<DetailsType>('none');
  readonly title = new BehaviorSubject<string>('none');

  getDetails = (
    _responseModel:
      | MovieResponseModel
      | PlanetResponseModel
      | CharacterResponseModel
      | StarshipResponseModel
  ) => new Promise<void>(() => {});
  clearDetails = () => {};
}
