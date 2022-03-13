import { Subscribe } from "@tenon/shared";
import { TenonService } from "./service";

export class TenonIndexedDB {
  public _db!: IDBDatabase;
  public services = new Set<TenonService>();
  private _request: IDBOpenDBRequest;
  public eventEmitter = new Subscribe();
  public onLoad: any[] = [];
  constructor(name: string) {
    this._request = indexedDB.open(name, 1);
    this.setupRequest().then(() => {
      this.eventEmitter.emit('onLaunch');
    });
  }

  setupRequest() {
    return new Promise((resolve, reject) => {
      this._request.onsuccess = (event: any) => {
        this._db = this._request.result;
        this.eventEmitter.emit('success', this._db);
        resolve(event);
      };
      this._request.onerror = (event: any) => {
        console.error('indexedDB开启失败');
        this.eventEmitter.emit('error');
        reject(event);
      }
      this._request.onupgradeneeded = (event: any) => {
        this._db = event.target.result;
        this.eventEmitter.emit('upgradeneeded', this._db);
      }
    })
  }

  registry(service: TenonService) {
    this.services.add(service);
  }
}

export const TenonIndexedDBInstance = new TenonIndexedDB('tenon');