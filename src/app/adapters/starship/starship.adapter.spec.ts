import { createMockCharacterResponse } from '../../models/character-response.model';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { createMockStarshipResponseModel } from '../../models/starship-response.model';
import { createMockString } from '../../utils/string.utils';
import { StarshipAdapter } from './starship.adapter';

describe('Starship Adapter', () => {
  it('should transform to model', () => {
    const mockStarshipName = createMockString();
    const mockFilmName = createMockString();
    const mockPilotName = createMockString();
    const mockStarshipResponse = createMockStarshipResponseModel({
      name: mockStarshipName,
      films: [mockFilmName],
      pilots: [mockPilotName],
    });
    const mockFilmResponse = createMockMovieResponseModel({
      url: mockFilmName,
    });
    const mockPilotResponse = createMockCharacterResponse({
      url: mockPilotName,
    });

    const result = StarshipAdapter.toModel(
      mockStarshipResponse,
      [mockFilmResponse],
      [mockPilotResponse]
    );

    expect(result.name).toEqual(mockStarshipName);
    expect(result.films).toEqual([mockFilmResponse]);
    expect(result.pilots).toEqual([mockPilotResponse]);
  });
});
