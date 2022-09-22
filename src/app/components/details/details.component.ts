import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterResponseModel } from '../../models/character-response.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';
import { DetailsStrategy } from '../../strategies/details/details.strategy';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit, OnDestroy {
  @ViewChild('details') detailsView?: ElementRef;
  currentDetails = this.detailsStrategy.currentDetails;
  isOpen = this.detailsStrategy.isDetailsOpen;
  isLoading = this.detailsStrategy.isDetailsLoading;
  type = this.detailsStrategy.detailsType;
  title = this.detailsStrategy.title;

  private subscriptions: Subscription[] = [];
  constructor(
    private renderer: Renderer2,
    private readonly detailsStrategy: DetailsStrategy
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.isOpen.subscribe({
        next: (value: boolean) => {
          if (value === true) {
            document.body.style.overflowY = 'hidden';
            if (this.detailsView)
              this.renderer.setStyle(
                this.detailsView.nativeElement,
                'width',
                '80%'
              );
          } else {
            document.body.style.overflowY = 'auto';
            if (this.detailsView)
              this.renderer.setStyle(
                this.detailsView.nativeElement,
                'width',
                '0'
              );
          }
        },
        error: () => console.log('failed to load details'),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

  onSelectedItemChange = (
    item:
      | MovieResponseModel
      | PlanetResponseModel
      | CharacterResponseModel
      | StarshipResponseModel
  ) => this.detailsStrategy.getDetails(item);

  close() {
    this.detailsStrategy.clearDetails();
  }
}
