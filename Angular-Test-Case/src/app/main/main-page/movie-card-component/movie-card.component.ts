import { Input } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenreModel } from '../../../models/genre.model';
import { MovieModel } from '../../../models/movie.model';
import { FavouriteMoviesService } from '../../../services/favourite-movies-service';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnDestroy {

  @Input() movie: MovieModel;
  public genres: GenreModel[] = [];
  public isFavourite: boolean = false;

  private _unsubscribe: Subject<any>;

  constructor(
    private _movieService: MovieService,
    private _favouriteMoviesService: FavouriteMoviesService,
  ) {
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this._movieService.genres.some(genre => {
      if (this.movie.genre_ids.includes(genre.id))
        this.genres.push(genre);
    });

    this._favouriteMoviesService.onFavouriteMoviesChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(favourites => {
        this.isFavourite = false;

        if (favourites.includes(this.movie.id))
          this.isFavourite = true;
      });
  }

  checkBoxChecked(isChecked: boolean): void {
    if (isChecked)
      this._favouriteMoviesService.onAddToFavourites.next(this.movie.id);
    else
      this._favouriteMoviesService.onRemoveFromFavourites.next(this.movie.id);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
