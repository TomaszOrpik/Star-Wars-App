import { Component, OnInit } from '@angular/core';
import { MoviesFacade } from '../../facades/movies/movies.facade';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrls: ['./movie-card-list.component.scss'],
})
export class MovieCardListComponent implements OnInit {
  movies = this.facade.movies;
  constructor(private readonly facade: MoviesFacade) {}

  ngOnInit(): void {
    this.facade.getMovies();
  }
}
