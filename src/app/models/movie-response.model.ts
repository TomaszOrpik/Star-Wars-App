import { createMockDateString } from '../utils/date.utils';
import { createMockNumber } from '../utils/number.utils';
import { createMockString } from '../utils/string.utils';

interface IMovieResponseModel {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export class MovieResponseModel {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  constructor(props: IMovieResponseModel) {
    this.title = props.title;
    this.episode_id = props.episode_id;
    this.opening_crawl = props.opening_crawl;
    this.director = props.director;
    this.producer = props.producer;
    this.release_date = props.release_date;
    this.characters = props.characters;
    this.planets = props.planets;
    this.starships = props.starships;
    this.created = props.created;
    this.edited = props.edited;
    this.url = props.url;
  }
}

export const createMockMovieResponseModel = (
  props?: Partial<IMovieResponseModel>
): MovieResponseModel => {
  return {
    title: createMockString(),
    episode_id: createMockNumber(),
    opening_crawl: createMockString(),
    director: createMockString(),
    producer: createMockString(),
    release_date: createMockDateString(),
    characters: [createMockString()],
    planets: [createMockString()],
    starships: [createMockString()],
    created: createMockDateString(),
    edited: createMockDateString(),
    url: createMockString(),
    ...props,
  };
};
