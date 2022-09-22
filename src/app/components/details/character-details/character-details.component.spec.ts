import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMockMovieResponseModel } from '../../../models/movie-response.model';
import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
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
