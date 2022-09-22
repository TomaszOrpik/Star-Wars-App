import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { AuthFacade } from '../../facades/auth/auth.facade';
import { SearchFacade } from '../../facades/search/search.facade';
import { CharacterResponseModel } from '../../models/character-response.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';
import { DetailsStrategy } from '../../strategies/details/details.strategy';
import { delay } from '../../utils/promise.utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchFacade],
})
export class SearchComponent implements AfterViewInit, OnDestroy, OnInit {
  isLoading = this.searchFacade.isLoading;
  results = this.searchFacade.results;

  loading = 'Loading';
  memoryCheck = true;

  @ViewChild('suggestions') suggestions?: ElementRef;
  @ViewChild('search') search?: ElementRef;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly searchFacade: SearchFacade,
    private readonly authFacade: AuthFacade,
    private readonly detailsStrategy: DetailsStrategy,
    private readonly renderer: Renderer2,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.updateLoadingValue();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      fromEvent(this.search?.nativeElement, 'keyup')
        .pipe(debounceTime(300))
        .subscribe((e: any) => {
          const value = e.target.value;
          if (value.length === 0) {
            this.searchFacade.clearData();
          } else {
            this.searchFacade.searchForData(value);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.memoryCheck = false;
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

  focus() {
    this.renderer.setStyle(
      this.suggestions?.nativeElement,
      'overflow-y',
      'auto'
    );
    this.renderer.setStyle(
      this.suggestions?.nativeElement,
      'max-height',
      '75%'
    );
  }

  focusOut() {
    this.renderer.setStyle(this.suggestions?.nativeElement, 'max-height', '0');
    this.renderer.setStyle(
      this.suggestions?.nativeElement,
      'overflow-y',
      'hidden'
    );
  }

  resultSelected = (
    result:
      | MovieResponseModel
      | PlanetResponseModel
      | CharacterResponseModel
      | StarshipResponseModel
  ) => this.detailsStrategy.getDetails(result);

  private async updateLoadingValue() {
    while (this.memoryCheck) {
      this.loading = 'Loading.';
      await delay(500);
      this.loading = 'Loading..';
      await delay(500);
      this.loading = 'Loading...';
      await delay(500);
    }
  }

  signOut() {
    this.authFacade.signOut();
    this.router.navigate(['login']);
  }
}
