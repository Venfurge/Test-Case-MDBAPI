import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class FavouriteMoviesService {

  onAddToFavourites: Subject<number>;
  onRemoveFromFavourites: Subject<number>;

  onFavouriteMoviesChanged: BehaviorSubject<number[]>;

  private _favourites: number[] = [];

  constructor() {
    this.onAddToFavourites = new Subject();
    this.onRemoveFromFavourites = new Subject();

    let query = localStorage.getItem("favourites");

    this._favourites = [];
    if (query) {
      this._favourites = JSON.parse(query);
    }

    this.onFavouriteMoviesChanged = new BehaviorSubject(this._favourites);

    this.onAddToFavourites.subscribe(movieId => this.addToFavourites(movieId));
    this.onRemoveFromFavourites.subscribe(movieId => this.removeFromFavourites(movieId));
  }

  private addToFavourites(movieId: number) {
    this._favourites.push(movieId);

    localStorage.setItem("favourites", JSON.stringify(this._favourites));

    this.onFavouriteMoviesChanged.next(this._favourites);
  }

  private removeFromFavourites(movieId: number) {
    this._favourites = this._favourites.filter(id => id != movieId);

    localStorage.setItem("favourites", JSON.stringify(this._favourites));

    this.onFavouriteMoviesChanged.next(this._favourites);
  }
}
