export class TenonStore {
  private _store = new Map();
  private _storeKey = new Set<string>();

  set(key: string, value: any, useLocalStorage = false) {
    this._store.set(key, value);
    this._storeKey.add(key);
    if (useLocalStorage) {
      localStorage.setItem(this.genKey(key), JSON.stringify(value));
    }
  }

  get(key: string) {
    if (!this._store.has(key)) {
      const item = localStorage.getItem(this.genKey(key));
      if (item) {
        this._store.set(key, JSON.parse(item));
      }
    }
    return this._store.get(key);
  }

  remove(key: string) {
    this._store.delete(key);
    localStorage.removeItem(this.genKey(key));
  }

  clear() {
    this._storeKey.forEach(key => {
      this._store.delete(key);
      localStorage.removeItem(this.genKey(key));
    });
    this._store.clear();
    this._storeKey.clear();
  }

  genKey(key: string) {
    return `tenon-sdk-store:${key}`;
  }
}