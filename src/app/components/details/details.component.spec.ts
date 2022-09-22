import { Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMockMovieResponseModel } from '../../models/movie-response.model';
import { DetailsStrategy } from '../../strategies/details/details.strategy';
import { DetailsStrategyMock } from '../../strategies/details/details.strategy.mock';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let renderer: Renderer2;
  let detailsStrategy: DetailsStrategy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        Renderer2,
        {
          provide: DetailsStrategy,
          useClass: DetailsStrategyMock,
        },
      ],
    }).compileComponents();
    detailsStrategy = TestBed.inject(DetailsStrategy);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    renderer = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>
    );
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set details view size on init', () => {
    renderer.setStyle = jest.fn();

    detailsStrategy.isDetailsOpen.next(true);

    expect(renderer.setStyle).toHaveBeenCalledTimes(1);
    expect(renderer.setStyle).toHaveBeenCalledWith(
      component.detailsView?.nativeElement,
      'width',
      '80%'
    );
  });

  it('should remove details view size on init', () => {
    renderer.setStyle = jest.fn();

    detailsStrategy.isDetailsOpen.next(false);

    expect(renderer.setStyle).toHaveBeenCalledTimes(1);
    expect(renderer.setStyle).toHaveBeenCalledWith(
      component.detailsView?.nativeElement,
      'width',
      '0'
    );
  });

  it('should get details on selected item change', () => {
    const mockItem = createMockMovieResponseModel();
    detailsStrategy.getDetails = jest.fn();

    component.onSelectedItemChange(mockItem);

    expect(detailsStrategy.getDetails).toHaveBeenCalledTimes(1);
    expect(detailsStrategy.getDetails).toHaveBeenCalledWith(mockItem);
  });

  it('should clear strategy on close', () => {
    detailsStrategy.clearDetails = jest.fn();

    component.close();

    expect(detailsStrategy.clearDetails).toHaveBeenCalledTimes(1);
  });
});
