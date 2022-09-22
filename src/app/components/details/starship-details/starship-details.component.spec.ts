import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMockCharacterResponse } from '../../../models/character-response.model';
import { StarshipDetailsComponent } from './starship-details.component';

describe('StarshipDetailsComponent', () => {
  let component: StarshipDetailsComponent;
  let fixture: ComponentFixture<StarshipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarshipDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item on select', () => {
    const mockCharacterResponseModel = createMockCharacterResponse();
    component.selectedItem.emit = jest.fn();

    component.handleSelection(mockCharacterResponseModel);

    expect(component.selectedItem.emit).toHaveBeenCalledTimes(1);
    expect(component.selectedItem.emit).toHaveBeenCalledWith(
      mockCharacterResponseModel
    );
  });
});
