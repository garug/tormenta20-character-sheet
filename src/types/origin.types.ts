import { IPower } from "./power.types";

export interface IBaseOrigin {
    name: string,
    custom?: boolean,
    powers?: Array<IPower>,
}

export interface IComputedOrigin extends IBaseOrigin {
    custom: boolean,
}
