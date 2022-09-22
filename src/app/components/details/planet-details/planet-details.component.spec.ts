import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMockMovieResponseModel } from '../../../models/movie-response.model';
import { PlanetDetailsComponent } from './planet-details.component';

describe('PlanetDetailsComponent', () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item on select', () => {
    const mockMovieResponseModel = createMockMovieResponseModel();
    component.selectedItem.emit = jest.fn();

    component.handleSelection(mockMovieResponseModel);

    expect(component.selectedItem.emit).toHaveBeenCalledTimes(1);
    expect(component.selectedItem.emit).toHaveBeenCalledWith(
      mockMovieResponseModel
    );
  });
});
