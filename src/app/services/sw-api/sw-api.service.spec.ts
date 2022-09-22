import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  CharacterResponseModel,
  createMockCharacterResponse,
} from '../../models/character-response.model';
import { createMockString } from '../../utils/string.utils';
import { SWService } from './sw-api.service';

describe('SW Service', () => {
  let service: SWService<CharacterResponseModel>;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    service = new SWService<CharacterResponseModel>(httpClient);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should laod data from urls', async () => {
    const mockUrl = createMockString();
    const mockCharacter = createMockCharacterResponse();
    httpClient.get = jest.fn().mockImplementation(() => of(mockCharacter));

    const result = await service.loadData([mockUrl]);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(mockUrl);
    expect(result).toEqual([mockCharacter]);
  });
});
