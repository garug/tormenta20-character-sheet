export type ShortAttribute = "for" | "des" | "car" | "int" | "sab" | "con";
export type Attributes = [number, number, number, number, number, number];

export interface IAttribute {
    name: string,
    short: ShortAttribute,
    value: number,
}

export interface IComputedAttribute extends IAttribute {
    mod: number,
    race: number,
    total: number,
}

export interface IAttributeModification {
    value: number,
    affect: ShortAttribute
}

export interface IEntryAttributes {
    attributes: Attributes,
    modifications: Array<IAttributeModification>
}

export interface IEntryAttribute {
    attribute: IAttribute,
    value: number,
}
