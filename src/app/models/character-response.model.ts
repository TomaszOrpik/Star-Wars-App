import { createMockString } from '../utils/string.utils';

interface ICharacterResponseModel {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export class CharacterResponseModel implements ICharacterResponseModel {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  constructor(props: ICharacterResponseModel) {
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

export const createMockCharacterResponse = (
  props?: Partial<ICharacterResponseModel>
): CharacterResponseModel =>
  new CharacterResponseModel({
    name: createMockString(),
    height: createMockString(),
    mass: createMockString(),
    hair_color: createMockString(),
    skin_color: createMockString(),
    eye_color: createMockString(),
    birth_year: createMockString(),
    gender: createMockString(),
    homeworld: createMockString(),
    films: [createMockString()],
    starships: [createMockString()],
    created: createMockString(),
    edited: createMockString(),
    url: createMockString(),
    ...props,
  });
