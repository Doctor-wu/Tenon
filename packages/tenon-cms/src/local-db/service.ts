import { TenonIndexedDB, TenonIndexedDBInstance } from "./indexedDB";

export class TenonService {
  public db: TenonIndexedDB;
  public store!: IDBObjectStore;
  constructor(db: TenonIndexedDB, storeName: string) {
    this.db = db;
    this.db.registry(this);
    this.addOnLoad(() => {
      this.updateStore(storeName);
    });
  }

  updateStore(storeName: string) {
    const db = this.db._db;
    if (!db) return;
    if (!db.objectStoreNames.contains(storeName)) {
      this.store = db.createObjectStore(storeName, { autoIncrement: true });
      this.createIndex('id', 'id', {
        unique: true,
      });
    } else {
      this.store = db.transaction(storeName).objectStore(storeName);
    }
  }

  update(db: TenonIndexedDB) {
    this.db = db;
  }

  createIndex(keyName: string, keyPath: string, config: IDBIndexParameters = {}) {
    this.store.createIndex(keyName, keyPath, config);
  }

  createTransaction(storeName: string | string[] = ['tenon'], mode: IDBTransactionMode = 'readwrite') {
    return this.db._db.transaction(storeName, mode);
  }

  addOnLoad(fn: Function) {
    this.db.addOnLoad(fn);
  }
}

// export const TenonServiceInstance = new TenonService(TenonIndexedDBInstance, 'tenon');
// console.log(TenonServiceInstance);
