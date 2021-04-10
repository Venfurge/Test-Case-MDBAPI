export class MovieModel {
  public id: number;
  public title: string;
  public overview: string;
  public poster_path: string | null;
  public release_date: string;

  public genre_ids: number[];

  constructor(model: any) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
