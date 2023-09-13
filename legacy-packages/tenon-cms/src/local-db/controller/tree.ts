import { ComponentSerializeConfig } from "@tenon/legacy-engine";
import { TenonIndexedDBInstance } from "../indexedDB";
import { TenonService } from "../service";

export interface TreeStruct {
  lastID: number;
  config: ComponentSerializeConfig;
}
export default class TreeController {
  public service: TenonService;
  constructor(service: TenonService) {
    this.service = service;
  }

  add(tree: TreeStruct, key: string = 'TREE') {
    return new Promise<Event>((resolve, reject) => {
      const request = this.service
        .createTransaction(['tree'], 'readwrite')
        .objectStore('tree')
        .add(tree, key);
      request.onsuccess = (event: any) => {
        resolve(event);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    });
  }

  get(key: string = 'TREE') {
    return new Promise<TreeStruct>((resolve, reject) => {
      const request = this.service
        .createTransaction(['tree'], 'readonly')
        .objectStore('tree')
        .get(key);
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    })
  }

  async set(tree: TreeStruct) {
    if (!await this.get()) {
      return await this.add(tree);
    } else {
      return new Promise<Event>((resolve, reject) => {
        const request = this.service
          .createTransaction(['tree'], 'readwrite')
          .objectStore('tree')
          .put(tree, 'TREE');
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
    const request = this.service
      .createTransaction(['tree'], 'readonly')
      .objectStore('tree')
      .delete('TREE');
  }
}

let treeModel: TreeController;

export const getTreeModel = () => treeModel;

treeModel = new TreeController(new TenonService(TenonIndexedDBInstance, 'tree'));
