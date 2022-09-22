import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesFacade } from '../../facades/movies/movies.facade';
import { MoviesFacadeMock } from '../../facades/movies/movies.facade.mock';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let moviesFacade: MoviesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        {
          provide: MoviesFacade,
          useClass: MoviesFacadeMock,
        },
      ],
    }).compileComponents();
    moviesFacade = TestBed.inject(MoviesFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade on init', () => {
    moviesFacade.getMovies = jest.fn();

    component.ngOnInit();

    expect(moviesFacade.getMovies).toHaveBeenCalledTimes(1);
  });
});
