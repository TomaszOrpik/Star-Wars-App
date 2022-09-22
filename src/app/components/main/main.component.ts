import { Component, OnInit } from '@angular/core';
import { MoviesFacade } from '../../facades/movies/movies.facade';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private readonly facade: MoviesFacade) {}

  ngOnInit(): void {
    this.facade.getMovies();
  }
}
