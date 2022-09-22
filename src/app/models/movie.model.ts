import { createMockDateString } from '../utils/date.utils';
import { createMockNumber } from '../utils/number.utils';
import { createMockString } from '../utils/string.utils';
import {
  CharacterResponseModel,
  createMockCharacterResponse,
} from './character-response.model';
import {
  createMockPlanetResponseModel,
  PlanetResponseModel,
} from './planet-response.model';
import {
  createMockStarshipResponseModel,
  StarshipResponseModel,
} from './starship-response.model';

interface IMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: CharacterResponseModel[];
  planets: PlanetResponseModel[];
  starships: StarshipResponseModel[];
  created: string;
  edited: string;
  url: string;
}

export class Movie implements IMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: CharacterResponseModel[];
  planets: PlanetResponseModel[];
  starships: StarshipResponseModel[];
  created: string;
  edited: string;
  url: string;

  constructor(props: IMovie) {
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

export const createMockMovie = (props?: Partial<IMovie>): Movie =>
  new Movie({
    title: createMockString(),
    episode_id: createMockNumber(),
    opening_crawl: createMockString(),
    director: createMockString(),
    producer: createMockString(),
    release_date: createMockDateString(),
    characters: [createMockCharacterResponse()],
    planets: [createMockPlanetResponseModel()],
    starships: [createMockStarshipResponseModel()],
    created: createMockDateString(),
    edited: createMockDateString(),
    url: createMockString(),
    ...props,
  });
