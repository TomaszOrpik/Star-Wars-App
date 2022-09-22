import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ISWService } from './sw-api.service.interface';

@Injectable()
export class SWService<T> implements ISWService<T> {
  constructor(private readonly httpClient: HttpClient) {}

  public async loadData(urls: string[]) {
    if (urls.length !== 0) {
      return await Promise.all(urls.map((url) => this.getData<T>(url)));
    } else return [];
  }

  private getData<T>(url: string): Promise<T> {
    return firstValueFrom(this.httpClient.get<T>(url));
  }
}
