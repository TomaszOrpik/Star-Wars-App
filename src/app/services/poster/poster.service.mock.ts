import { createMockString } from '../../utils/string.utils';
import { IPosterService } from './poster.service.interface';

export class PosterServiceMock implements IPosterService {
  getPoster = (_episodeId: number) => createMockString();
}
