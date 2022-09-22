import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesFacade } from '../../facades/movies/movies.facade';
import { MoviesFacadeMock } from '../../facades/movies/movies.facade.mock';

import { MovieCardListComponent } from './movie-card-list.component';

describe('MovieCardListComponent', () => {
  let component: MovieCardListComponent;
  let fixture: ComponentFixture<MovieCardListComponent>;
  let facade: MoviesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardListComponent],
      providers: [
        {
          provide: MoviesFacade,
          useClass: MoviesFacadeMock,
        },
      ],
    }).compileComponents();
    facade = TestBed.inject(MoviesFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies on init', () => {
    facade.getMovies = jest.fn();

    component.ngOnInit();

    expect(facade.getMovies).toHaveBeenCalledTimes(1);
  });
});
