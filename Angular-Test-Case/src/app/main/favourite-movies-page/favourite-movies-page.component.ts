import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { MovieInfoModel } from '../../models/movie-info.model';
import { MovieModel } from '../../models/movie.model';
import { FavouriteMoviesService } from '../../services/favourite-movies-service';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'favourite-movies-page',
  templateUrl: './favourite-movies-page.component.html',
  styleUrls: ['./favourite-movies-page.component.scss']
})
export class FavouriteMoviesPageComponent implements OnInit, OnDestroy {

  public favouriteMovies: MovieModel[] = [];
  public isPageLoading: boolean = true;

  private _unsubscribe: Subject<any>;

  constructor(
    private _favouritesMoviesService: FavouriteMoviesService,
    private _movieService: MovieService,
  ) {
    this._unsubscribe = new Subject();
    this.isPageLoading = true;
  }

  ngOnInit(): void {

    //Temporary movie array
    let movies = [];

    this._favouritesMoviesService.onFavouriteMoviesChanged
      .pipe(
        //Getting favourite movie ids
        mergeMap(ids => {

          movies = [];
          if (!ids.length) {
            this.favouriteMovies = movies;
          }

          return ids;
        }),
        //Foreach id get movie
        mergeMap(id => {
          return this._movieService.getMovieInfo(id);
        }),
        takeUntil(this._unsubscribe))
      .subscribe(movie => {
        //Map model and push to list
        movies.push(this.mapMovieInfoToMovieModel(movie));
        this.favouriteMovies = movies;

        this.isPageLoading = false;
      });
  }

  mapMovieInfoToMovieModel(movieInfo: MovieInfoModel): MovieModel {
    if (!movieInfo)
      return null;

    return new MovieModel({
      id: movieInfo.id,
      overview: movieInfo.overview,
      title: movieInfo.title,
      release_date: movieInfo.release_date,
      poster_path: movieInfo.poster_path,
      genre_ids: movieInfo.genres.map(genre => genre.id),
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
