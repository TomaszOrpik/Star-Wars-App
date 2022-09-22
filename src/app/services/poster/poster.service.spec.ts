import { PosterService } from './poster.service';

describe('Poster Service', () => {
  let service: PosterService;

  beforeEach(() => {
    service = new PosterService();
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should return poster', () => {
    const posterId = 'l1kgucN5ZinWwurSFXH9YdM6QjY.jpg';

    const result = service.getPoster(1);

    expect(result).toEqual(
      `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${posterId}`
    );
  });
});
