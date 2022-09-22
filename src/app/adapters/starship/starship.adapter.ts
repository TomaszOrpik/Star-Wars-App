import { CharacterResponseModel } from '../../models/character-response.model';
import { MovieResponseModel } from '../../models/movie-response.model';
import { StarshipResponseModel } from '../../models/starship-response.model';
import { Starship } from '../../models/starship.model';

export class StarshipAdapter {
  public static toModel(
    starship: StarshipResponseModel,
    films: MovieResponseModel[],
    pilots: CharacterResponseModel[]
  ) {
    const filmsModels = this.getFilms(starship, films);
    const pilotsModels = this.getPilots(starship, pilots);
    return new Starship({
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      cost_in_credits: starship.cost_in_credits,
      length: starship.length,
      max_atmosphering_speed: starship.max_atmosphering_speed,
      crew: starship.crew,
      passengers: starship.passengers,
      cargo_capacity: starship.cargo_capacity,
      consumables: starship.consumables,
      hyperdrive_rating: starship.hyperdrive_rating,
      MGLT: starship.MGLT,
      starship_class: starship.starship_class,
      pilots: pilotsModels as CharacterResponseModel[],
      films: filmsModels as MovieResponseModel[],
      created: starship.created,
      edited: starship.edited,
      url: starship.url,
    });
  }

  private static getFilms(
    starship: StarshipResponseModel,
    films: MovieResponseModel[]
  ) {
    const movieModels = starship.films.map((url) =>
      films.find((f) => f.url === url)
    );
    const clearMovies = movieModels.filter((m) => m);
    return clearMovies;
  }

  private static getPilots(
    starship: StarshipResponseModel,
    characters: CharacterResponseModel[]
  ) {
    const pilotsModels = starship.pilots.map((url) =>
      characters.find((c) => c.url === url)
    );
    const clearPilots = pilotsModels.filter((p) => p);
    return clearPilots;
  }
}
