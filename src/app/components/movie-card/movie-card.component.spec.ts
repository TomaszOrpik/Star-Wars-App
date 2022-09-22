import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesFacade } from '../../facades/movies/movies.facade';
import { MoviesFacadeMock } from '../../facades/movies/movies.facade.mock';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { DetailsStrategy } from '../../strategies/details/details.strategy';
import { DetailsStrategyMock } from '../../strategies/details/details.strategy.mock';
import { createMockNumber } from '../../utils/number.utils';
import { createMockString } from '../../utils/string.utils';
import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let facade: MoviesFacade;
  let strategy: DetailsStrategy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      providers: [
        {
          provide: MoviesFacade,
          useClass: MoviesFacadeMock,
        },
        {
          provide: DetailsStrategy,
          useClass: DetailsStrategyMock,
        },
      ],
    }).compileComponents();
    facade = TestBed.inject(MoviesFacade);
    strategy = TestBed.inject(DetailsStrategy);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get details on details clicked', () => {
    const mockMovieResponseModel = createMockMovieResponseModel();
    strategy.getDetails = jest.fn();

    component.onDetailsClicked(mockMovieResponseModel);

    expect(strategy.getDetails).toHaveBeenCalledTimes(1);
    expect(strategy.getDetails).toHaveBeenCalledWith(mockMovieResponseModel);
  });

  it('should get poster', () => {
    const mockPoster = createMockString();
    facade.getPoster = jest.fn().mockReturnValue(mockPoster);
    const mockNumber = createMockNumber();

    const result = component.getPoster(mockNumber);

    expect(facade.getPoster).toHaveBeenCalledTimes(1);
    expect(facade.getPoster).toHaveBeenCalledWith(mockNumber);
    expect(result).toEqual(mockPoster);
  });
});
