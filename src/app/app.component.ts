import { Component } from '@angular/core';
import { MoviesFacade } from './facades/movies/movies.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MoviesFacade],
})
export class AppComponent {
}
