import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { MovieInfoModel } from '../models/movie-info.model';
import { MovieService } from './movie-service';

@Injectable()
export class MovieResolver implements Resolve<any> {

  routeParams: any;

  onCurrentMovieChanged: BehaviorSubject<any>;
  onCurrentMovieRecomnedationsChanged: BehaviorSubject<any>;

  constructor(
    private _movieService: MovieService,
  ) {
    this.onCurrentMovieChanged = new BehaviorSubject(new MovieInfoModel({}));
    this.onCurrentMovieRecomnedationsChanged = new BehaviorSubject([]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getMovie(),
      ]).then(
        ([files]) => {

          //Some actions...

          resolve(null);
        },
        reject
      );
    });
  }

  public async getMovie(): Promise<void> {
    let movieId = this.routeParams['id'];
    if (movieId == null) return;

    this._movieService.getMovieInfo(movieId)
      .subscribe(movieInfo => {
        this.onCurrentMovieChanged.next(movieInfo);
      });

    this._movieService.getMovieRecomendations(movieId, 1)
      .subscribe(recomendations => {
        this.onCurrentMovieRecomnedationsChanged.next(recomendations);
      });
  }
}
