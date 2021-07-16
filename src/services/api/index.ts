import { BearerAuthStrategy } from '../../core/auth-strategies/bearer-auth-strategy';
import { AxiosHttpClient } from '../../core/http-clients/axios-http-client';
import { HttpMethodsTypes } from '../../core/intrefaces';

import { UserService } from './user-service';
import { userStorage } from '../storage';

const authStrategy = new BearerAuthStrategy({
  storage: userStorage,
  refreshRequestConfig: {
    url: '/refresh',
    method: HttpMethodsTypes.POST,
  }
});

const axiosHttpClient = new AxiosHttpClient(authStrategy);

export const userService = new UserService(axiosHttpClient);
