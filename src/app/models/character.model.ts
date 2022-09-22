import { createMockString } from '../utils/string.utils';
import {
  createMockMovieResponseModel,
  MovieResponseModel,
} from './movie-response.model';
import {
  createMockPlanetResponseModel,
  PlanetResponseModel,
} from './planet-response.model';
import {
  createMockStarshipResponseModel,
  StarshipResponseModel,
} from './starship-response.model';

interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: PlanetResponseModel;
  films: MovieResponseModel[];
  starships: StarshipResponseModel[];
  created: string;
  edited: string;
  url: string;
}

export class Character implements ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: PlanetResponseModel;
  films: MovieResponseModel[];
  starships: StarshipResponseModel[];
  created: string;
  edited: string;
  url: string;
  constructor(props: ICharacter) {
    this.name = props.name;
    this.height = props.height;
    this.mass = props.mass;
    this.hair_color = props.hair_color;
    this.skin_color = props.skin_color;
    this.eye_color = props.eye_color;
    this.birth_year = props.birth_year;
    this.gender = props.gender;
    this.homeworld = props.homeworld;
    this.films = props.films;
    this.starships = props.starships;
    this.created = props.created;
    this.edited = props.edited;
    this.url = props.url;
  }
}

export const createMockCharacter = (props?: Partial<ICharacter>): Character =>
  new Character({
    name: createMockString(),
    height: createMockString(),
    mass: createMockString(),
    hair_color: createMockString(),
    skin_color: createMockString(),
    eye_color: createMockString(),
    birth_year: createMockString(),
    gender: createMockString(),
    homeworld: createMockPlanetResponseModel(),
    films: [createMockMovieResponseModel()],
    starships: [createMockStarshipResponseModel()],
    created: createMockString(),
    edited: createMockString(),
    url: createMockString(),
    ...props,
  });
