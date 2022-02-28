import { executeQueueEvents } from "@tenon/engine";
import { cloneDeep } from "lodash";

export interface ITenonComponentStates {
  states: any;
  executeTenonEvents: (eventName: string, ...args: any[]) => void;
}
export class TenonComponentStates implements ITenonComponentStates {
  private _states: any;
  private _tenonComp: any;

  constructor(states: any, tenonComp: any) {
    this._states = states;
    this._tenonComp = tenonComp;
    this._states.executeTenonEvents$ = this.executeTenonEvents.bind(this);
  }

  executeTenonEvents(eventName: string, ...args: any[]) {
    if (!this._tenonComp.events[eventName]) return;
    executeQueueEvents(this._tenonComp.events[eventName].executeQueue, ...args);
  };

  public get states() {
    return this._states;
  }
}