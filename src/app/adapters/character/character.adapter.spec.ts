import { createMockCharacterResponse } from '../../models/character-response.model';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { createMockPlanetResponseModel } from '../../models/planet-response.model';
import { createMockStarshipResponseModel } from '../../models/starship-response.model';
import { createMockString } from '../../utils/string.utils';
import { CharacterAdapter } from './character.adapter';

describe('Character adapter', () => {
  it('should transform to model', () => {
    const mockName = createMockString();
    const mockPlanetName = createMockString();
    const mockFilmName = createMockString();
    const mockStarshipName = createMockString();
    const mockCharacterResponseModel = createMockCharacterResponse({
      name: mockName,
      homeworld: mockPlanetName,
      films: [mockFilmName],
      starships: [mockStarshipName],
    });
    const mockPlanet = createMockPlanetResponseModel({
      url: mockPlanetName,
    });
    const mockFilm = createMockMovieResponseModel({
      url: mockFilmName,
    });
    const mockStarship = createMockStarshipResponseModel({
      url: mockStarshipName,
    });

    const result = CharacterAdapter.toModel(
      mockCharacterResponseModel,
      mockPlanet,
      [mockFilm],
      [mockStarship]
    );

    expect(result.name).toEqual(mockCharacterResponseModel.name);
    expect(result.homeworld.url).toEqual(mockPlanetName);
    expect(result.films[0].url).toEqual(mockFilmName);
    expect(result.starships[0].url).toEqual(mockStarshipName);
  });
});
