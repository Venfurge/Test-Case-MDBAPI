import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GenreModel } from '../models/genre.model';
import { MoviePageModel } from '../models/movie-page.model';
import { MovieModel } from '../models/movie.model';

@Injectable()
export class MovieService implements OnDestroy {

  public onMovieSearchChanged: BehaviorSubject<string>;

  public genres: GenreModel[];

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private _unsubscribe: Subject<any>;

  constructor(
    private _httpClient: HttpClient,
  ) {
    this._unsubscribe = new Subject();
    this.onMovieSearchChanged = new BehaviorSubject('');

    this.getGenres()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(response => {
        this.genres = response.genres;
      })
  }

  public getMovies(request: number): Observable<MovieModel[]> {
    return this._httpClient.get<MoviePageModel>(this.apiUrl + `movie/popular?api_key=${this.apiKey}&page=${request}`)
      .pipe(map(response => {
        return response.results;
      }));
  }

  public getMoviesFromQuery(query: string, page: number): Observable<MovieModel[]> {
    return this._httpClient.get<MoviePageModel>(this.apiUrl + `search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`)
      .pipe(map(response => {
        return response.results;
      }));
  }

  public getMovieInfo(request: number): Observable<any> {
    return this._httpClient.get<any>(this.apiUrl + `movie/${request}?api_key=${this.apiKey}`)
      .pipe(map(response => response),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }

  public getMovieRecomendations(request: number, page: number): Observable<MovieModel[]> {
    return this._httpClient.get<MoviePageModel>(this.apiUrl + `movie/${request}/recommendations?api_key=${this.apiKey}&page=${page}`)
      .pipe(map(response => {
        return response.results;
      }));
  }

  public getGenres(): Observable<{ genres: GenreModel[] }> {
    return this._httpClient.get<{ genres: GenreModel[] }>(this.apiUrl + `genre/movie/list?api_key=${this.apiKey}`);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
