import { createMockString } from '../utils/string.utils';
import {
  CharacterResponseModel,
  createMockCharacterResponse,
} from './character-response.model';
import {
  createMockMovieResponseModel,
  MovieResponseModel,
} from './movie-response.model';

interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: CharacterResponseModel[];
  films: MovieResponseModel[];
  created: string;
  edited: string;
  url: string;
}

export class Planet implements IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: CharacterResponseModel[];
  films: MovieResponseModel[];
  created: string;
  edited: string;
  url: string;

  constructor(props: IPlanet) {
    this.name = props.name;
    this.rotation_period = props.rotation_period;
    this.orbital_period = props.orbital_period;
    this.diameter = props.diameter;
    this.climate = props.climate;
    this.gravity = props.gravity;
    this.terrain = props.terrain;
    this.surface_water = props.surface_water;
    this.population = props.population;
    this.residents = props.residents;
    this.films = props.films;
    this.created = props.created;
    this.edited = props.edited;
    this.url = props.url;
  }
}

export const createMockPlanet = (props?: Partial<IPlanet>): Planet =>
  new Planet({
    name: createMockString(),
    rotation_period: createMockString(),
    orbital_period: createMockString(),
    diameter: createMockString(),
    climate: createMockString(),
    gravity: createMockString(),
    terrain: createMockString(),
    surface_water: createMockString(),
    population: createMockString(),
    residents: [createMockCharacterResponse()],
    films: [createMockMovieResponseModel()],
    created: createMockString(),
    edited: createMockString(),
    url: createMockString(),
    ...props,
  });
