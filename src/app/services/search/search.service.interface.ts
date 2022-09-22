import { SearchResult, SearchType } from './search.service';

export abstract class ISearchService {
  abstract searchForData(
    type: SearchType,
    value: string
  ): Promise<SearchResult[]>;
}
