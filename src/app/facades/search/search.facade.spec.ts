import { TestBed } from '@angular/core/testing';
import { createMockCharacterResponse } from '../../models/character-response.model';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { createMockPlanetResponseModel } from '../../models/planet-response.model';
import { createMockStarshipResponseModel } from '../../models/starship-response.model';
import { SearchService } from '../../services/search/search.service';
import { SearchServiceMock } from '../../services/search/search.service.mock';
import { createMockString } from '../../utils/string.utils';
import { SearchFacade } from './search.facade';

describe('Search Facade', () => {
  let facade: SearchFacade;
  let searchService: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchFacade,
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
      ],
    });
    facade = TestBed.inject(SearchFacade);
    searchService = TestBed.inject(SearchService);
  });

  it('should be defined', () => expect(facade).toBeDefined());

  it('should search for data', async () => {
    const mockFilm = createMockMovieResponseModel();
    searchService.searchForData = jest.fn().mockResolvedValue([mockFilm]);

    await facade.searchForData(createMockString());

    expect(facade.results.value.length).toEqual(4);
    expect(facade.isLoading.value).toEqual(false);
    expect(searchService.searchForData).toHaveBeenCalledTimes(4);
  });

  it('should clear data', () => {
    facade.clearData();

    expect(facade.results.value).toEqual([]);
    expect(facade.isLoading.value).toEqual(false);
  });
});
