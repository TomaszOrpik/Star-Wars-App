import { createMockCharacterResponse } from '../../models/character-response.model';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { createMockPlanetResponseModel } from '../../models/planet-response.model';
import { createMockStarship } from '../../models/starship.model';
import { createMockString } from '../../utils/string.utils';
import { PlanetAdapter } from './planet.adapter';

describe('Planet adapter', () => {
  it('should transform to model', () => {
    const mockPlanetName = createMockString();
    const mockFilmName = createMockString();
    const mockResidentName = createMockString();
    const mockPlanetResponse = createMockPlanetResponseModel({
      name: mockPlanetName,
      films: [mockFilmName],
      residents: [mockResidentName],
    });
    const mockFilmResponse = createMockMovieResponseModel({
      url: mockFilmName,
    });
    const mockResidentResponse = createMockCharacterResponse({
      url: mockResidentName,
    });

    const result = PlanetAdapter.toModel(
      mockPlanetResponse,
      [mockFilmResponse],
      [mockResidentResponse]
    );

    expect(result.name).toEqual(mockPlanetName);
    expect(result.films).toEqual([mockFilmResponse]);
    expect(result.residents).toEqual([mockResidentResponse]);
  });
});
