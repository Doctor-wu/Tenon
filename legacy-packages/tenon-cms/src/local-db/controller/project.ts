import { IProjectState } from "@/store/modules/project";
import { TenonIndexedDBInstance } from "../indexedDB";
import { TenonService } from "../service";

export interface ProjectStruct {
  project: IProjectState["projectInfo"];
}
export default class ProjectController {
  public service: TenonService;
  constructor(service: TenonService) {
    this.service = service;
  }

  add(projectInfo: ProjectStruct, key: string = 'PROJECT') {
    return new Promise<Event>((resolve, reject) => {
      const request = this.service
        .createTransaction(['project'], 'readwrite')
        ?.objectStore('project')
        .add(projectInfo, key);
      request.onsuccess = (event: any) => {
        resolve(event);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    });
  }

  get(key: string = 'PROJECT') {
    return new Promise<ProjectStruct>((resolve, reject) => {
      const request = this.service
        .createTransaction('project', 'readonly')
        .objectStore('project')
        .get(key);
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      }
      request.onerror = (event: any) => {
        reject(event);
      }
    })
  }

  async set(projectInfo: ProjectStruct) {
    if (!await this.get()) {
      return await this.add(projectInfo);
    } else {
      return new Promise<Event>((resolve, reject) => {
        const request = this.service
          .createTransaction('project', 'readwrite')
          .objectStore('project')
          .put(projectInfo, 'PROJECT');
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
        .createTransaction('project', 'readwrite')
        .objectStore('project')
        .delete('PROJECT');
      request.onsuccess = (event: Event) => {
        resolve(event);
      }
      request.onerror = (event: Event) => {
        reject(event);
      }
    })
  }
}

let projectModel: ProjectController;

export const getProjectModel = () => projectModel;

projectModel = new ProjectController(new TenonService(TenonIndexedDBInstance, 'project'));