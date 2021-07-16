import { IHttpClient } from '../../core/intrefaces';

export class UserService {
  constructor(private http: IHttpClient) {}

  getUsers() {
    return this.http.get('/users');
  }
}
