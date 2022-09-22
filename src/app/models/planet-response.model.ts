import { createMockString } from '../utils/string.utils';

interface IPlanetResponseModel {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
export class PlanetResponseModel implements IPlanetResponseModel {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
  constructor(props: IPlanetResponseModel) {
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

export const createMockPlanetResponseModel = (
  props?: Partial<IPlanetResponseModel>
): PlanetResponseModel =>
  new PlanetResponseModel({
    name: createMockString(),
    rotation_period: createMockString(),
    orbital_period: createMockString(),
    diameter: createMockString(),
    climate: createMockString(),
    gravity: createMockString(),
    terrain: createMockString(),
    surface_water: createMockString(),
    population: createMockString(),
    residents: [createMockString()],
    films: [createMockString()],
    created: createMockString(),
    edited: createMockString(),
    url: createMockString(),
    ...props,
  });
