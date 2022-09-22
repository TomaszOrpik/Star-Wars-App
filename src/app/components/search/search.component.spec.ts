import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from '../../facades/auth/auth.facade';
import { AuthFacadeMock } from '../../facades/auth/auth.facade.mock';
import { SearchFacade } from '../../facades/search/search.facade';
import { SearchFacadeMock } from '../../facades/search/search.facade.mock';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { DetailsStrategy } from '../../strategies/details/details.strategy';
import { DetailsStrategyMock } from '../../strategies/details/details.strategy.mock';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let authFacade: AuthFacade;
  let detailsStrategy: DetailsStrategy;
  let router: Router;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [SearchComponent],
      providers: [
        Renderer2,
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: AuthFacade,
          useClass: AuthFacadeMock,
        },
        {
          provide: DetailsStrategy,
          useClass: DetailsStrategyMock,
        },
      ],
    }).compileComponents();
    authFacade = TestBed.inject(AuthFacade);
    detailsStrategy = TestBed.inject(DetailsStrategy);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    renderer = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render suggestions on focus', () => {
    renderer.setStyle = jest.fn();
    component.focus();

    expect(renderer.setStyle).toHaveBeenCalledTimes(2);
    expect(renderer.setStyle).toHaveBeenCalledWith(
      component.suggestions?.nativeElement,
      'overflow-y',
      'auto'
    );
    expect(renderer.setStyle).toHaveBeenCalledWith(
      component.suggestions?.nativeElement,
      'max-height',
      '75%'
    );
  });

  it('should hide suggestions on focus out', () => {
    renderer.setStyle = jest.fn();
    component.focusOut();

    expect(renderer.setStyle).toHaveBeenCalledTimes(2);
    expect(renderer.setStyle).toHaveBeenCalledWith(
      component.suggestions?.nativeElement,
      'max-height',
      '0'
    );
    expect(renderer.setStyle).toHaveBeenCalledWith(
      component.suggestions?.nativeElement,
      'overflow-y',
      'hidden'
    );
  });

  it('should call strategy on result selected', async () => {
    const mockResult = createMockMovieResponseModel();
    detailsStrategy.getDetails = jest.fn();

    await component.resultSelected(mockResult);

    expect(detailsStrategy.getDetails).toHaveBeenCalledTimes(1);
    expect(detailsStrategy.getDetails).toHaveBeenCalledWith(mockResult);
  });

  it('should sign out user', () => {
    authFacade.signOut = jest.fn();
    router.navigate = jest.fn();

    component.signOut();

    expect(authFacade.signOut).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
