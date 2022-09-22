import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  SearchResult,
  SearchService,
  SearchType,
} from '../../services/search/search.service';
import { ISearchFacade } from './search.facade.interface';

@Injectable()
export class SearchFacade implements ISearchFacade {
  results = new BehaviorSubject<SearchResult[]>([]);
  isLoading = new BehaviorSubject(false);
  constructor(private readonly searchService: SearchService) {}

  async searchForData(value: string) {
    this.isLoading.next(true);
    const result: SearchResult[] = [];
    const types: SearchType[] = ['films', 'people', 'planets', 'starships'];
    await Promise.all(
      types.map(async (type) => {
        const results = await this.searchService.searchForData(type, value);
        results.forEach((r) => result.push(r));
      })
    );
    this.results.next(result);
    this.isLoading.next(false);
  }

  clearData() {
    this.results.next([]);
    this.isLoading.next(false);
  }
}
