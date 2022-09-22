import { TestBed } from '@angular/core/testing';
import { PosterService } from '../../services/poster/poster.service';
import { PosterServiceMock } from '../../services/poster/poster.service.mock';
import { SWServiceMock } from '../../services/sw-api/sw-api.service.mock';
import { createMockNumber } from '../../utils/number.utils';
import { createMockString } from '../../utils/string.utils';
import { MoviesFacade } from './movies.facade';

describe('Movies Facade', () => {
  let facade: MoviesFacade;
  let posterService: PosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesFacade,
        {
          provide: PosterService,
          useClass: PosterServiceMock,
        },
        { provide: 'MoviesService', useClass: SWServiceMock },
      ],
    });
    facade = TestBed.inject(MoviesFacade);
    posterService = TestBed.inject(PosterService);
  });

  it('should be defined', () => expect(facade).toBeDefined());

  it('should get poster', () => {
    const mockEpisodeId = createMockNumber();
    const mockPoster = createMockString();
    posterService.getPoster = jest.fn().mockReturnValueOnce(mockPoster);

    const result = facade.getPoster(mockEpisodeId);

    expect(posterService.getPoster).toHaveBeenCalledTimes(1);
    expect(posterService.getPoster).toHaveBeenCalledWith(mockEpisodeId);
    expect(result).toEqual(mockPoster);
  });
});
