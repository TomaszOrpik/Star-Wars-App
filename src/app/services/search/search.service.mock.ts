import { createMockCharacterResponse } from '../../models/character-response.model';
import { SearchType, SearchResult } from './search.service';
import { ISearchService } from './search.service.interface';

export class SearchServiceMock implements ISearchService {
  searchForData = (
    _type: SearchType,
    _value: string
  ): Promise<SearchResult[]> =>
    new Promise(() => [
      {
        type: 'people',
        value: createMockCharacterResponse(),
      },
    ]);
}
