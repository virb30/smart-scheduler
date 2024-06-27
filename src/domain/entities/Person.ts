import { Entity } from "./Entity";
import { Id } from "../value-objects/Id";
import { PersonAvailability } from "./PersonAvailability";

type CreatePersonProps = {
    name: string,
}

type RestorePersonProps = {
    id: Id,
    name: string,
    availability: Date[];
};

export class Person extends Entity {
    private availability: PersonAvailability[] = [];

    private constructor(id: Id, private name: string) { 
        super(id);
    }

    static create({ name  }: CreatePersonProps) {
        return new Person(new Id(), name);
    }

    static restore({ id, name, availability }: RestorePersonProps) {  
        const person = new Person(id, name);
        for (const dateTime of availability) {
            person.addAvailability(dateTime);
        }
        return person;
    }

    addAvailability(dateTime: Date): void {
        const availability = PersonAvailability.create({ dateTime });
        if (this.availability.some((availability) => availability.isEqual(dateTime))) throw new Error("Availability already exists");
        this.availability.push(availability);
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