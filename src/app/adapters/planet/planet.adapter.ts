import { CharacterResponseModel } from "../../models/character-response.model";
import { MovieResponseModel } from "../../models/movie-response.model";
import { PlanetResponseModel } from "../../models/planet-response.model";
import { Planet } from "../../models/planet.model";


export class PlanetAdapter {
  public static toModel(
    planet: PlanetResponseModel,
    films: MovieResponseModel[],
    residents: CharacterResponseModel[]
  ) {
    const filmsModels = this.getFilms(planet, films);
    const residentsModels = this.getResidents(planet, residents);
    return new Planet({
      name: planet.name,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: planet.surface_water,
      population: planet.population,
      residents: residentsModels as CharacterResponseModel[],
      films: filmsModels as MovieResponseModel[],
      created: planet.created,
      edited: planet.edited,
      url: planet.url,
    });
  }

  private static getFilms(
    planet: PlanetResponseModel,
    films: MovieResponseModel[]
  ) {
    const movieModels = planet.films.map((url) =>
      films.find((f) => f.url === url)
    );
    const clearMovies = movieModels.filter((m) => m);
    return clearMovies;
  }

  private static getResidents(
    planet: PlanetResponseModel,
    residents: CharacterResponseModel[]
  ) {
    const residentsModels = planet.residents.map((url) =>
      residents.find((r) => r.url === url)
    );
    const clearResidents = residentsModels.filter((r) => r);
    return clearResidents;
  }
}
