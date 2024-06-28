import { Id } from "../value-objects/Id";
import { Entity } from "./Entity";
import { EventDate } from "./EventDate";

type CreateEventProps = {
    name: string;
    description?: string;
}


export class Event extends Entity {

    private eventDates: EventDate[] = [];
    private persons: Id[] = [];

    private constructor(id: Id, private name: string, private description?: string) {
        super(id);
    }

    static create({ name, description }: CreateEventProps): Event {
        return new Event(new Id(), name, description);
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description ?? "";
    }

    changeName(name: string): void {
        this.name = name;
    }

    changeDescription(description: string): void {
        this.description = description;
    }

    addEventDate(dateTime: Date, quantityRequired: number): void {
        const eventDate = EventDate.create({ dateTime, quantityRequired });
        if(this.eventDates.some((eventDate) => eventDate.isEqual(dateTime))) throw new Error("Event date already exists");
        this.eventDates.push(eventDate);
    }

    getEventDates(): EventDate[] {
        return this.eventDates;
    }

    addPerson(personId: Id): void {
        if(this.persons.some((person) => person.value === personId.value)) throw new Error("Person already registered")
        this.persons.push(personId);
    }

    getPersons(): Id[] {
        return this.persons;
    }

    getEventDatesBetween(fromDate: Date, toDate: Date): EventDate[] {
        return this.eventDates.filter((eventDate) => (eventDate.isBetween(fromDate, toDate)));
    }
}