import { ISWService } from './sw-api.service.interface';

export class SWServiceMock<T> implements ISWService<T> {
  public loadData = async (_urls: string[]): Promise<Awaited<T>[]> =>
    await Promise.all([]);
}
