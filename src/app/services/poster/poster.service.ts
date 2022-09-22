import { Injectable } from '@angular/core';
import { PostersDictionary } from './poster.dictionary';
import { IPosterService } from './poster.service.interface';

@Injectable({
  providedIn: 'root',
})
export class PosterService implements IPosterService {
  /**
   * @decription Returns url to episode poster
   * @param episodeId
   */
  public getPoster = (episodeId: number) =>
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${PostersDictionary[episodeId]}`;
}
