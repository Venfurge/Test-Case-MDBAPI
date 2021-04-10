import { GenreModel } from './genre.model';

export class MovieInfoModel {
  public id: number;
  public title: string;
  public overview: string;
  public budget: number;
  public release_date: string;
  public runtime: number;
  public status: string;
  public genres: GenreModel[];
  public poster_path: string;

  constructor(model: any) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
