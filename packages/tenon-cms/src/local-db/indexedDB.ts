import { TenonService } from "./service";

export class TenonIndexedDB {
  public _db!: IDBDatabase;
  public services = new Set<TenonService>();
  private _request: IDBOpenDBRequest;
  public onLoad: any[] = [];
  constructor(name: string) {
    this._request = indexedDB.open(name, 1);
    this.setupRequest().then(() => {
      this.onLoad.forEach((fn: Function) => {
        fn(this);
      });
      this.onLoad = [];
    });
  }

  addOnLoad(fn: Function) {
    this.onLoad.push(fn);
  }

  setupRequest() {
    return new Promise((resolve, reject) => {
      this._request.onsuccess = (event: any) => {
        this._db = this._request.result;
        resolve(event);
      };
      this._request.onerror = (event: any) => {
        console.error('indexedDB开启失败');
        reject(event);
      }
      this._request.onupgradeneeded = (event: any) => {
        this._db = event.target.result;
        resolve(event);
        [...this.services.values()].forEach((service: TenonService) => {
          service.update(this);
        });
      }
    })
  }

  registry(service: TenonService) {
    this.services.add(service);
  }
}

export const TenonIndexedDBInstance = new TenonIndexedDB('tenon');