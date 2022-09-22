import { CharacterResponseModel } from '../../models/character-response.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';

export abstract class IDetailsStrategy {
  abstract getDetails(
    responseModel:
      | MovieResponseModel
      | PlanetResponseModel
      | CharacterResponseModel
      | StarshipResponseModel
  ): Promise<void>;

  abstract clearDetails(): void;
}
