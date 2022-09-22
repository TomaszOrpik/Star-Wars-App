import { BehaviorSubject } from 'rxjs';
import { SearchResult } from '../../services/search/search.service';
import { ISearchFacade } from './search.facade.interface';

export class SearchFacadeMock implements ISearchFacade {
  results = new BehaviorSubject<SearchResult[]>([]);
  isLoading = new BehaviorSubject(false);

  searchForData = (_value: string): Promise<void> =>
    new Promise(() => {
      return;
    });
  clearData = (): void => {};
}
