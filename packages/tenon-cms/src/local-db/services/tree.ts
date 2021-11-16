import { TenonIndexedDBInstance } from "../indexedDB";
import { TenonService } from "../service";


export default class TreeController {
  public service: TenonService;
  constructor(service: TenonService) {
    this.service = service;
  }

  add(tree: any, key: string = 'TREE') {
    return new Promise((resolve, reject) => {
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

  get() {
    return new Promise((resolve, reject) => {
      const request = this.service
        .createTransaction(['tree'], 'readonly')
        .objectStore('tree')
        .get('TREE');
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    })
  }

  async set(tree: any) {
    if (!await this.get()) {
      return await this.add(tree);
    } else {
      return new Promise((resolve, reject) => {
        const request = this.service
          .createTransaction(['tree'], 'readwrite')
          .objectStore('tree')
          .put(tree, 'TREE');
        request.onsuccess = (event: any) => {
          resolve(event);
        }
        request.onerror = (event: any) => {
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