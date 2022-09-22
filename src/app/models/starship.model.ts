import { createMockString } from '../utils/string.utils';
import {
  CharacterResponseModel,
  createMockCharacterResponse,
} from './character-response.model';
import {
  createMockMovieResponseModel,
  MovieResponseModel,
} from './movie-response.model';

interface IStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: CharacterResponseModel[];
  films: MovieResponseModel[];
  created: string;
  edited: string;
  url: string;
}

export class Starship implements IStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: CharacterResponseModel[];
  films: MovieResponseModel[];
  created: string;
  edited: string;
  url: string;

  constructor(props: IStarship) {
    this.name = props.name;
    this.model = props.model;
    this.manufacturer = props.manufacturer;
    this.cost_in_credits = props.cost_in_credits;
    this.length = props.length;
    this.max_atmosphering_speed = props.max_atmosphering_speed;
    this.crew = props.crew;
    this.passengers = props.passengers;
    this.cargo_capacity = props.cargo_capacity;
    this.consumables = props.consumables;
    this.hyperdrive_rating = props.hyperdrive_rating;
    this.MGLT = props.MGLT;
    this.starship_class = props.starship_class;
    this.pilots = props.pilots;
    this.films = props.films;
    this.created = props.created;
    this.edited = props.edited;
    this.url = props.url;
  }
}

export const createMockStarship = (props?: Partial<IStarship>): Starship =>
  new Starship({
    name: createMockString(),
    model: createMockString(),
    manufacturer: createMockString(),
    cost_in_credits: createMockString(),
    length: createMockString(),
    max_atmosphering_speed: createMockString(),
    crew: createMockString(),
    passengers: createMockString(),
    cargo_capacity: createMockString(),
    consumables: createMockString(),
    hyperdrive_rating: createMockString(),
    MGLT: createMockString(),
    starship_class: createMockString(),
    pilots: [createMockCharacterResponse()],
    films: [createMockMovieResponseModel()],
    created: createMockString(),
    edited: createMockString(),
    url: createMockString(),
    ...props,
  });
