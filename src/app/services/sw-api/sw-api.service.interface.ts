export abstract class ISWService<T> {
  public abstract loadData(urls: string[]): Promise<Awaited<T>[]>;
}
