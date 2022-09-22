import { CharacterResponseModel } from '../../models/character-response.model';
import { Character } from '../../models/character.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';

export class CharacterAdapter {
  public static toModel(
    character: CharacterResponseModel,
    homeworld: PlanetResponseModel,
    films: MovieResponseModel[],
    starships: StarshipResponseModel[]
  ) {
    const filmsModels = this.getFilms(character, films);
    const starshipsModels = this.getStarships(character, starships);
    return new Character({
      name: character.name,
      height: character.height,
      mass: character.mass,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      birth_year: character.birth_year,
      gender: character.gender,
      homeworld,
      films: filmsModels as MovieResponseModel[],
      starships: starshipsModels as StarshipResponseModel[],
      created: character.created,
      edited: character.edited,
      url: character.url,
    });
  }

  private static getFilms(
    character: CharacterResponseModel,
    films: MovieResponseModel[]
  ) {
    const movieModels = character.films.map((url) =>
      films.find((f) => f.url === url)
    );
    const clearMovies = movieModels.filter((m) => m);
    return clearMovies;
  }

  private static getStarships(
    character: CharacterResponseModel,
    starships: StarshipResponseModel[]
  ) {
    const starshipsModels = character.starships.map((url) =>
      starships.find((s) => s.url === url)
    );
    const clearStarships = starshipsModels.filter((s) => s);
    return clearStarships;
  }
}
