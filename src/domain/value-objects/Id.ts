import { v4 as uuid } from 'uuid';

export class Id {

    readonly value;

    constructor(value?: string) { 
        this.value = value ?? uuid();
    }
}