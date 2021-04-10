import { MovieModel } from './movie.model';

export class MoviePageModel {
  public page: number;
  public results: MovieModel[];
  public total_results: number;
  public total_pages: number;

  constructor(model: any) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
