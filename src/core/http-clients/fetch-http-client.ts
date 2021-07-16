import { IAuthStrategy, IHttpClient } from '../intrefaces';

export class FetchHttpClient implements IHttpClient {
  private requests = [];

  constructor(private readonly authStrategy?: IAuthStrategy) {

  }

  request(config) {
    requests.push(config);
  }

  get<R = any>(url: string, params = {}, config = {}) {
    return fetch({
      method: 'GET',
      url,
    });
  }
}
