import { Entity } from "./Entity";
import { Id } from "../value-objects/Id";
import { PersonAvailability } from "./PersonAvailability";

type CreatePersonProps = {
    name: string,
    availability: Date[];
}

type RestorePersonProps = {
    id: Id,
    name: string,
    availability: PersonAvailability[];
};

export class Person extends Entity {
    private constructor(readonly id: Id, private name: string, private availability: PersonAvailability[]) { 
        super(id);
    }

    static create({ name, availability }: CreatePersonProps) {
        const personAvailability = availability.map((dateTime) => PersonAvailability.create({ dateTime }));
        return new Person(new Id(), name, personAvailability);
    }

    static restore({ id, name, availability }: RestorePersonProps) {        
        return new Person(id, name, availability);
    }

    getAvailability(): any[] {
        return this.availability;
    }

    getName(): string {
        return this.name
    }

    changeName(name: string): void {
        this.name = name;
    }
}