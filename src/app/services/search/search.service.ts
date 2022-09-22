import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CharacterResponseModel } from '../../models/character-response.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';
import { ISearchService } from './search.service.interface';

export type SearchType = 'people' | 'films' | 'starships' | 'planets';

export type SearchResultModel =
  | MovieResponseModel
  | CharacterResponseModel
  | StarshipResponseModel
  | PlanetResponseModel;

export type SearchResult = {
  type: SearchType;
  value: SearchResultModel;
};

@Injectable({
  providedIn: 'root',
})
export class SearchService implements ISearchService {
  constructor(private readonly httpClient: HttpClient) {}
  async searchForData<T>(
    type: SearchType,
    value: string
  ): Promise<SearchResult[]> {
    const result = await firstValueFrom(
      this.httpClient.get<{ results: T[] }>(
        `https://swapi.dev/api/${type}/?search=${value}`
      )
    );
    const mappedResults = result.results.map((v) => ({
      type: type,
      value: v as unknown as SearchResultModel,
    }));
    return mappedResults;
  }
}
