import { IUserState } from "@/store/modules/user";
import { TenonIndexedDBInstance } from "../indexedDB";
import { TenonService } from "../service";

export interface UserStruct {
  userInfo: IUserState["userInfo"];
}
export default class UserController {
  public service: TenonService;
  constructor(service: TenonService) {
    this.service = service;
  }

  add(userInfo: UserStruct, key: string = 'USER') {
    return new Promise<Event>((resolve, reject) => {
      const request = this.service
        .createTransaction(['user'], 'readwrite')
        ?.objectStore('user')
        .add(userInfo, key);
      request.onsuccess = (event: any) => {
        resolve(event);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    });
  }

  get(key: string = 'USER') {
    return new Promise<UserStruct>((resolve, reject) => {
      const request = this.service
        .createTransaction('user', 'readonly')
        .objectStore('user')
        .get(key);
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    })
  }

  async set(userInfo: UserStruct) {
    if (!await this.get()) {
      return await this.add(userInfo);
    } else {
      return new Promise<Event>((resolve, reject) => {
        const request = this.service
          .createTransaction('user', 'readwrite')
          .objectStore('user')
          .put(userInfo, 'USER');
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
        .createTransaction('user', 'readwrite')
        .objectStore('user')
        .delete('USER');
      request.onsuccess = (event: Event) => {
        resolve(event);
      }
      request.onerror = (event: Event) => {
        reject(event);
      }
    })
  }
}

let userModel: UserController;

export const getUserModel = () => userModel;

userModel = new UserController(new TenonService(TenonIndexedDBInstance, 'user'));