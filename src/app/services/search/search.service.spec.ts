import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { createMockCharacterResponse } from '../../models/character-response.model';
import { createMockString } from '../../utils/string.utils';
import { SearchService } from './search.service';

describe('Search Service', () => {
  let service: SearchService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should search for data', async () => {
    const mockSearchCondition = createMockString();
    const mockType = 'people';
    const mockSearchResults = [createMockCharacterResponse()];
    httpClient.get = jest.fn().mockImplementation(() =>
      of({
        results: mockSearchResults,
      })
    );

    const result = await service.searchForData(mockType, mockSearchCondition);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `https://swapi.dev/api/${mockType}/?search=${mockSearchCondition}`
    );
    expect(result).toEqual([
      {
        type: mockType,
        value: mockSearchResults[0],
      },
    ]);
  });
});
