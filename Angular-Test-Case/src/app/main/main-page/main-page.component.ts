import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public movies: MovieModel[] = [];
  public moviePage: number = 1;
  public isLoading: boolean = false;
  public isPageLoading: boolean = true;
  public form: FormGroup;

  private _unsubscribe: Subject<any>;

  constructor(
    private _movieService: MovieService,
    private _builder: FormBuilder,
  ) {
    this._unsubscribe = new Subject();
    this.isPageLoading = true;
  }

  ngOnInit(): void {
    this._movieService.getMovies(this.moviePage)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(movies => {
        this.movies = movies;
        this.isPageLoading = false;
      });

    this.form = this.createForm();
  }

  createForm(): FormGroup {
    let form = this._builder.group({
      find: [''],
    });

    return form;
  }

  search(): void {
    this.moviePage = 1;

    if (!this.form.value.find) {
      this._movieService.getMovies(this.moviePage)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(v => {
          this.movies = v;
        });

      return;
    }

    this._movieService.getMoviesFromQuery(this.form.value.find, 1)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(v => {
        this.movies = v;
      });
  }

  onScroll(): void {
    this.isLoading = true;

    if (!this.form.value.find) {
      this._movieService.getMovies(++this.moviePage)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(v => {
          setTimeout(() => {
            this.movies = this.movies.concat(v);
            this.isLoading = false;
          }, 1500)
        });

      return;
    }

    this._movieService.getMoviesFromQuery(this.form.value.find, ++this.moviePage)
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
