export default class SearchModel {
  public constructor(init?: Partial<SearchModel>) {
    Object.assign(this, init);
  }

  public orderBy: string;
  public isDesc: boolean;
  public currentPage: number;
  public pageSize: number;
}
