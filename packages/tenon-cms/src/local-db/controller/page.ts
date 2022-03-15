import { IPageState } from "@/store/modules/page";
import { TenonIndexedDBInstance } from "../indexedDB";
import { TenonService } from "../service";

export interface PageStruct {
  page: IPageState["pageInfo"];
}
export default class PageController {
  public service: TenonService;
  constructor(service: TenonService) {
    this.service = service;
  }

  add(pageInfo: PageStruct, key: string = 'PAGE') {
    return new Promise<Event>((resolve, reject) => {
      const request = this.service
        .createTransaction(['page'], 'readwrite')
        ?.objectStore('page')
        .add(pageInfo, key);
      request.onsuccess = (event: any) => {
        resolve(event);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    });
  }

  get(key: string = 'PAGE') {
    return new Promise<PageStruct>((resolve, reject) => {
      const request = this.service
        .createTransaction('page', 'readonly')
        .objectStore('page')
        .get(key);
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    })
  }

  async set(pageInfo: PageStruct) {
    if (!await this.get()) {
      return await this.add(pageInfo);
    } else {
      return new Promise<Event>((resolve, reject) => {
        const request = this.service
          .createTransaction('page', 'readwrite')
          .objectStore('page')
          .put(pageInfo, 'PAGE');
        request.onsuccess = (event: Event) => {
          resolve(event);
        }
        request.onerror = (event: Event) => {
          reject(event);
        }
      });
    }
  }

  async remove() {
    return new Promise((resolve, reject) => {
      const request = this.service
        .createTransaction('page', 'readwrite')
        .objectStore('page')
        .delete('PAGE');
      request.onsuccess = (event: Event) => {
        resolve(event);
      }
      request.onerror = (event: Event) => {
        reject(event);
      }
    })
  }
}

let pageModel: PageController;

export const getPageModel = () => pageModel;

pageModel = new PageController(new TenonService(TenonIndexedDBInstance, 'page'));