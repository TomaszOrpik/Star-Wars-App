import { TestBed, tick } from '@angular/core/testing';
import { CharacterAdapter } from '../../adapters/character/character.adapter';
import { MovieAdapter } from '../../adapters/movie/movie.adapter';
import { PlanetAdapter } from '../../adapters/planet/planet.adapter';
import { StarshipAdapter } from '../../adapters/starship/starship.adapter';
import {
  CharacterResponseModel,
  createMockCharacterResponse,
} from '../../models/character-response.model';
import {
  createMockMovieResponseModel,
  MovieResponseModel,
} from '../../models/movie-response.model';
import {
  createMockPlanetResponseModel,
  PlanetResponseModel,
} from '../../models/planet-response.model';
import { createMockStarshipResponseModel } from '../../models/starship-response.model';
import { SWService } from '../../services/sw-api/sw-api.service';
import { SWServiceMock } from '../../services/sw-api/sw-api.service.mock';
import { createMockString } from '../../utils/string.utils';
import { DetailsStrategy } from './details.strategy';

describe('Details Strategy', () => {
  let strategy: DetailsStrategy;
  let swService: SWServiceMock<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'PlanetService', useClass: SWServiceMock },
        {
          provide: 'CharacterService',
          useClass: SWServiceMock,
        },
        { provide: 'StarshipService', useClass: SWServiceMock },
        {
          provide: 'MovieService',
          useClass: SWServiceMock,
        },
        {
          provide: 'MoviesService',
          useClass: SWServiceMock,
        },
        {
          provide: SWService,
          useClass: SWServiceMock,
        },
      ],
    });
    strategy = TestBed.inject(DetailsStrategy);
    swService = TestBed.inject(SWService);
  });

  it('should be defined', () => expect(strategy).toBeDefined());

  it('should get movies', async () => {
    const mockMovieResponseModel = createMockMovieResponseModel({
      planets: [],
      characters: [],
      starships: [],
    });
    const mockMovie = MovieAdapter.toModel(mockMovieResponseModel, [], [], []);

    await strategy.getDetails(mockMovieResponseModel);

    expect(strategy.isDetailsOpen.value).toEqual(true);
    expect(strategy.detailsType.value).toEqual('movie');
    expect(strategy.title.value).toEqual(
      `Episode ${mockMovie.episode_id}: ${mockMovie.title}`
    );
    expect(strategy.currentDetails.value).toEqual(mockMovie);
  });

  it('should get planets', async () => {
    const mockPlanetResponseModel = createMockPlanetResponseModel({
      films: [],
      residents: [],
    });
    const mockPlanet = PlanetAdapter.toModel(mockPlanetResponseModel, [], []);

    await strategy.getDetails(mockPlanetResponseModel);

    expect(strategy.isDetailsOpen.value).toEqual(true);
    expect(strategy.title.value).toEqual(mockPlanet.name);
    expect(strategy.currentDetails.value).toEqual(mockPlanet);
  });

  it('should get characters', async () => {
    const mockCharacterResponseModel = createMockCharacterResponse({
      films: [],
      starships: [],
    });
    let mockCharacter = CharacterAdapter.toModel(
      mockCharacterResponseModel,
      {} as PlanetResponseModel,
      [],
      []
    );
    Object.assign(mockCharacter, {
      homeworld: undefined,
    });

    await strategy.getDetails(mockCharacterResponseModel);

    expect(strategy.isDetailsOpen.value).toEqual(true);
    expect(strategy.title.value).toEqual(mockCharacter.name);
    expect(strategy.currentDetails.value).toEqual(mockCharacter);
  });

  it('should get starships', async () => {
    const mockStarshipResponseModel = createMockStarshipResponseModel({
      films: [],
      pilots: [],
    });
    const mockStarship = StarshipAdapter.toModel(
      mockStarshipResponseModel,
      [],
      []
    );

    await strategy.getDetails(mockStarshipResponseModel);

    expect(strategy.isDetailsOpen.value).toEqual(true);
    expect(strategy.title.value).toEqual(mockStarship.name);
    expect(strategy.currentDetails.value).toEqual(mockStarship);
  });

  it('should clear data', () => {
    strategy.clearDetails();

    expect(strategy.isDetailsOpen.value).toEqual(false);
    expect(strategy.currentDetails.value).toEqual(undefined);
  });
});
