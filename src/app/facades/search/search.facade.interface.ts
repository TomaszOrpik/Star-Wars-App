export abstract class ISearchFacade {
  abstract searchForData(value: string): Promise<void>;
  abstract clearData(): void;
}
