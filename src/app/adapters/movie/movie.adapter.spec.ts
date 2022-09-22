import { createMockCharacterResponse } from '../../models/character-response.model';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { createMockPlanetResponseModel } from '../../models/planet-response.model';
import { createMockStarshipResponseModel } from '../../models/starship-response.model';
import { createMockString } from '../../utils/string.utils';
import { MovieAdapter } from './movie.adapter';

describe('Movie Adapter', () => {
  it('should transform to model', () => {
    const mockMovieName = createMockString();
    const mockPlanetName = createMockString();
    const mockStarshipName = createMockString();
    const mockCharacterName = createMockString();
    const mockMovieResponseModel = createMockMovieResponseModel({
      title: mockMovieName,
      planets: [mockPlanetName],
      starships: [mockStarshipName],
      characters: [mockCharacterName],
    });
    const mockPlanet = createMockPlanetResponseModel({
      url: mockPlanetName,
    });
    const mockStarship = createMockStarshipResponseModel({
      url: mockStarshipName,
    });
    const mockCharacter = createMockCharacterResponse({
      url: mockCharacterName,
    });

    const result = MovieAdapter.toModel(
      mockMovieResponseModel,
      [mockPlanet],
      [mockStarship],
      [mockCharacter]
    );

    expect(result.title).toEqual(mockMovieName);
    expect(result.planets).toEqual([mockPlanet]);
    expect(result.starships).toEqual([mockStarship]);
    expect(result.characters).toEqual([mockCharacter]);
  });
});
