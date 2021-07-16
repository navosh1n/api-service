import { UserStorage } from './user-storage';
import { BrowserStorageAdapter } from '../../core/storages/browser-storage-adapter';

const storage = new BrowserStorageAdapter(localStorage);

export const userStorage = new UserStorage(storage);
