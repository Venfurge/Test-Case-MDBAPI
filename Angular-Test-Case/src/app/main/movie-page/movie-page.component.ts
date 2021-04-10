import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieInfoModel } from '../../models/movie-info.model';
import { MovieModel } from '../../models/movie.model';
import { FavouriteMoviesService } from '../../services/favourite-movies-service';
import { MovieResolver } from '../../services/movie-resolver';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit, OnDestroy {
  public movieInfo: MovieInfoModel;
  public movieId: number;
  public isFavourite: boolean = false;

  public movies: MovieModel[] = [];
  public moviePage: number = 1;
  public isLoading: boolean = false; 

  private _unsubscribe: Subject<any>;

  constructor(
    private _movieService: MovieService,
    private _movieResolverService: MovieResolver,
    private _favouriteMoviesService: FavouriteMoviesService,
    private _route: ActivatedRoute,
  ) {
    this._unsubscribe = new Subject();
    this.movieInfo = new MovieInfoModel({});
  }

  ngOnInit(): void {
    let routeMap = this._route.snapshot.paramMap;
    this.movieId = Number(routeMap.get('id'));

    this._movieResolverService.onCurrentMovieChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(movieInfo => {
        this.movieInfo = movieInfo;
      });

    this._movieResolverService.onCurrentMovieRecomnedationsChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(recomendations => {
        this.movies = recomendations;
      });

    this._favouriteMoviesService.onFavouriteMoviesChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(favourites => {
        this.isFavourite = false;

        if (favourites.includes(this.movieId))
          this.isFavourite = true;
      });
  }

  checkBoxChecked(isChecked: boolean): void {
    if (isChecked)
      this._favouriteMoviesService.onAddToFavourites.next(this.movieId);
    else
      this._favouriteMoviesService.onRemoveFromFavourites.next(this.movieId);
  }

  onScroll(): void {
    this.isLoading = true;

    this._movieService.getMovieRecomendations(this.movieId, ++this.moviePage)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(v => {
        setTimeout(() => {
          this.movies = this.movies.concat(v);
          this.isLoading = false;
        }, 1500)
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
