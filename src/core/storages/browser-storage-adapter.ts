import { IStorage } from '../intrefaces';

export class BrowserStorageAdapter implements IStorage {
  constructor(private storage: Storage) {}

  getItem<R = any>(key: string): R {
    const item = this.storage.getItem(key);
    try {
      return item ? JSON.parse(item) : item;
    } catch (e) {
      return item;
    }
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
