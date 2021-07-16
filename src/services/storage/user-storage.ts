import { IStorage } from '../../core/intrefaces';
import {
  ITokens,
  IUserStorage,
  TokensTypes,
} from '../../core/auth-strategies/bearer-auth-strategy';

export class UserStorage implements IUserStorage {
  constructor(private storage: IStorage) {

  }

  get accessToken(): string {
    return this.storage.getItem(TokensTypes.accessToken);
  };

  get refreshToken(): string {
    return this.storage.getItem<string>(TokensTypes.refreshToken);
  };

  removeTokens(): void {
    Object.keys(TokensTypes).forEach(key => this.storage.removeItem(key));
  }

  setTokens(tokens: ITokens): void {
    this.storage.setItem(TokensTypes.accessToken, tokens.accessToken);
    this.storage.setItem(TokensTypes.refreshToken, tokens.refreshToken);
  }
}

export interface IUserStorageData {

}
