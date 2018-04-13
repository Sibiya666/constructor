import { ICar } from "./app.models";
import { Action } from "@ngrx/store";

export function createAction(type, payload?): Action {
    return { type: payload }
}

export interface IAppStore {
    car: ICar;
}