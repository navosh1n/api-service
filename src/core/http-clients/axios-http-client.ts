import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IAuthStrategy, IHttpClient, IRequestConfig } from '../intrefaces';

export class AxiosHttpClient implements IHttpClient {
  private http: AxiosInstance;

  constructor(private readonly authStrategy?: IAuthStrategy, config?: AxiosRequestConfig) {
    this.http = axios.create(config);

    if (authStrategy) {
      this.http.interceptors.request.use(authStrategy.requestHandler);
      this.http.interceptors.response.use(undefined, this._errorHandler);
    }
  }

  // прокидывает каждую http ошибку в стратегию
  // предоставляет стратегии возможность произвести запрос на рефшер
  // повторяет запрос после успешного обновления или прокидывает ошибку
  // предоставляет стратегии возможность редактирования конфига каждого запроса

  private _errorHandler = async (error: AxiosError) => {
    if (!error.isAxiosError) return Promise.reject(error);
    try {
      await this.authStrategy?.errorHandler(this.request.bind(this), {
        status: error.response?.status,
        config: error.config as IRequestConfig,
      });
      return this.request(error.config);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  request(config: AxiosRequestConfig) {
    return this.http.request(config);
  }

  get<R = any>(url: string, params = {}, config = {}): Promise<R> {
    return this.http.get(url, {
      ...config,
      params,
    });
  }

  post<R = any>(url: string, data = {}, config = {}): Promise<R> {
    return this.http.post(url, data, config);
  }

  put<R = any>(url: string, data = {}, config = {}): Promise<R> {
    return this.http.put(url, data, config);
  }

  delete<R = any>(url: string, params = {}, config = {}): Promise<R> {
    return this.http.delete(url, {
      ...config,
      params,
    });
  }
}
