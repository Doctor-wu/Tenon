import { TenonIndexedDB, TenonIndexedDBInstance } from "./indexedDB";

export class TenonService {
  public db: TenonIndexedDB;
  public store!: IDBObjectStore;
  public storeName: string;
  constructor(db: TenonIndexedDB, storeName: string) {
    this.db = db;
    this.storeName = storeName;
    this.db.registry(this);
    this.db.eventEmitter.on('success', () => {
      this.updateStore(this.storeName);
    });
    this.db.eventEmitter.on('upgradeneeded', (db: IDBDatabase) => {
      this.createStore(this.storeName);
    });
  }

  get IDB() {
    return this.db._db;
  }

  updateStore(storeName: string) {
    const db = this.db._db;
    if (!db) return;
    if (db.objectStoreNames.contains(storeName)) {
      this.store = db.transaction(storeName).objectStore(storeName);
    }
  }

  createStore(storeName: string) {
    const db = this.db._db;
    if (!db) return;
    if (!db.objectStoreNames.contains(storeName)) {
      this.store = db.createObjectStore(storeName, { autoIncrement: true });
      // this.createIndex('username', 'username', {
      //   unique: true,
      // });
    }
  }

  createIndex(keyName: string, keyPath: string, config: IDBIndexParameters = {}) {
    this.store.createIndex(keyName, keyPath, config);
  }

  createTransaction(storeName: string | string[] = ['tenon'], mode: IDBTransactionMode = 'readwrite') {
    return this.IDB.transaction(storeName, mode);
  }
}

// export const TenonServiceInstance = new TenonService(TenonIndexedDBInstance, 'tenon');
// console.log(TenonServiceInstance);
