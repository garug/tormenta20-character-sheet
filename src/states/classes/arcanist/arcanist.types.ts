import { IBaseClasse } from "@/types/classes.types";

export interface ICaminhoArcanista {
    name: string,
    description: string,
}

export interface IArcanistClasse extends IBaseClasse {
    caminho: ICaminhoArcanista
}