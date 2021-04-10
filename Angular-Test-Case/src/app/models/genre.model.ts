export class GenreModel {
  public id: number;
  public name: string;

  constructor(model: any) {
    if (model == null) return;
    Object.assign(this, model);
  }
}
