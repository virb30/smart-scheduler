import { Id } from "../value-objects/Id";

export abstract class Entity {
    constructor(readonly id: Id) { }

    getId(): string {
        return this.id.value;
    }
}