import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMockCharacterResponse } from '../../../models/character-response.model';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item on select', () => {
    const characterResponseModel = createMockCharacterResponse();
    component.selectedItem.emit = jest.fn();

    component.handleSelection(characterResponseModel);

    expect(component.selectedItem.emit).toHaveBeenCalledTimes(1);
    expect(component.selectedItem.emit).toHaveBeenCalledWith(
      characterResponseModel
    );
  });
});
