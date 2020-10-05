import { IPower } from "./power.types";

export interface IBaseOrigin {
    name: string,
    description: string,
    custom?: boolean,
    powers?: Array<IPower>,
}

export interface IComputedOrigin extends IBaseOrigin {
    custom: boolean,
}
