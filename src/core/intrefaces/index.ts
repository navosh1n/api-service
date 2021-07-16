export interface IHttpClient {
  new(authStrategy: IAuthStrategy): IHttpClient;

  get<R = any>(url: string, params?: Record<string, any>, config?: Record<string, any>): Promise<R>;

  post<R = any>(url: string, data?: Record<string, any>, config?: Record<string, any>): Promise<R>;

  put<R = any>(url: string, data?: Record<string, any>, config?: Record<string, any>): Promise<R>;

  delete<R = any>(
    url: string,
    params?: Record<string, any>,
    config?: Record<string, any>,
  ): Promise<R>;
}

export interface IAuthStrategy {
  requestHandler(config: IRequestConfig): IRequestConfig | Promise<IRequestConfig>;

  errorHandler(refreshCallback: any, error: IResponseError): Promise<any>;
}

export interface IResponseError {
  status?: number;
  config: IRequestConfig;
}

export interface IRequestConfig {
  headers: Record<string, string>;
}

export interface IStorage {
  getItem<R = any>(key: string): R;

  removeItem(key: string): void;

  setItem(key: string, value: any): void;

  clear(): void;
}

export enum HttpMethodsTypes {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
