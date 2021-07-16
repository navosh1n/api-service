import {
  HttpMethodsTypes,
  IAuthStrategy,
  IRequestConfig,
  IResponseError,
} from '../intrefaces';

export class BearerAuthStrategy implements IAuthStrategy {
  static refreshPromise = null;
  private storage: IUserStorage;
  private readonly refreshRequestConfig: IRefreshRequestConfig;

  constructor(config: IBearerAuthStrategyConfig) {
    this.storage = config.storage;
    this.refreshRequestConfig = config.refreshRequestConfig;
  }

  errorHandler = async (request: any, error: IResponseError) => {
    if (error.status === 401) {
      if (BearerAuthStrategy.refreshPromise) return BearerAuthStrategy.refreshPromise;

      BearerAuthStrategy.refreshPromise = request({
        ...this.refreshRequestConfig,
        headers: {
          Authorization: `Bearer ${this.storage.refreshToken}`,
        },
      }).then((tokens: ITokens) => {
        this.storage.setTokens(tokens);
        BearerAuthStrategy.refreshPromise = null;
      }).catch(() => {
        this.storage.removeTokens();
      });

      return BearerAuthStrategy.refreshPromise;
    }

    return Promise.reject(error);
  };

  requestHandler(config: IRequestConfig): IRequestConfig {
    config.headers.Authorization = `Bearer ${this.storage.accessToken}`;
    return config;
  }
}

// обрабатывает 401 ошибку (колбек/подписка)
// посылает запрос на рефреш
// обновляет или сбрасывает токены

export interface IUserStorage {
  readonly accessToken: string;
  readonly refreshToken: string;

  setTokens(tokens: ITokens): void;

  removeTokens(): void;
}

export interface IBearerAuthStrategyConfig {
  storage: IUserStorage;
  refreshRequestConfig: IRefreshRequestConfig;
}

export interface IRefreshRequestConfig {
  url: string;
  method: HttpMethodsTypes;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export enum TokensTypes {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken'
}
