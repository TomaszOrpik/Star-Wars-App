import { CharacterResponseModel } from '../../models/character-response.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { Movie } from '../../models/movie.model';
import { PlanetResponseModel } from '../../models/planet-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';

export class MovieAdapter {
  public static toModel(
    movie: MovieResponseModel,
    planets: PlanetResponseModel[],
    starships: StarshipResponseModel[],
    characters: CharacterResponseModel[]
  ) {
    const planetsModels = this.getPlanets(movie, planets);
    const starshipsModels = this.getStarships(movie, starships);
    const charactersModels = this.getCharacters(movie, characters);
    return new Movie({
      title: movie.title,
      episode_id: movie.episode_id,
      opening_crawl: movie.opening_crawl,
      director: movie.director,
      producer: movie.producer,
      release_date: movie.release_date,
      characters: charactersModels as CharacterResponseModel[],
      planets: planetsModels as PlanetResponseModel[],
      starships: starshipsModels as StarshipResponseModel[],
      created: movie.created,
      edited: movie.edited,
      url: movie.url,
    });
  }

  private static getPlanets(
    movie: MovieResponseModel,
    planets: PlanetResponseModel[]
  ) {
    const planetsModels = movie.planets.map((url) =>
      planets.find((p) => p.url === url)
    );
    const clearPlanets = planetsModels.filter((p) => p);
    return clearPlanets;
  }

  private static getStarships(
    movie: MovieResponseModel,
    starships: StarshipResponseModel[]
  ) {
    const starshipsModels = movie.starships.map((url) =>
      starships.find((s) => s.url === url)
    );
    const clearStarships = starshipsModels.filter((s) => s);
    return clearStarships;
  }

  private static getCharacters(
    movie: MovieResponseModel,
    characters: CharacterResponseModel[]
  ) {
    const characterModels = movie.characters.map((url) =>
      characters.find((c) => c.url === url)
    );
    const clearCharacters = characterModels.filter((c) => c);
    return clearCharacters;
  }
}
