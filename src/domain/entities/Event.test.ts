import { Id } from "../value-objects/Id";
import { Event } from "./Event";

describe("Event unit tests", () => {
    it("should create an event", () => {
        const event = Event.create({ name: "Evento teste" });
        expect(event).toBeInstanceOf(Event);
        expect(event.getId()).toBeDefined();
        expect(event.getName()).toBe("Evento teste");
        expect(event.getDescription()).toBe("");
    });

    it("should change event name", () => {
        const event = Event.create({ name: "Evento teste" });        
        expect(event.getName()).toBe("Evento teste");
        event.changeName("Evento teste 2");
        expect(event.getName()).toBe("Evento teste 2");
    });

    it("should change event description", () => {
        const event = Event.create({ name: "Evento teste" });        
        expect(event.getDescription()).toBe("");
        event.changeDescription("Evento teste teste");
        expect(event.getDescription()).toBe("Evento teste teste");
    });

    it("should add eventDateTime", () => {
        const event = Event.create({ name: "Evento teste" });
        event.addEventDate(new Date("2024-01-01T10:00:00"), 2);
        event.addEventDate(new Date("2024-01-01T19:00:00"), 3);
        const eventDates = event.getEventDates();
        expect(eventDates).toHaveLength(2);
        expect(eventDates[0].getDateTime()).toEqual(new Date("2024-01-01T10:00:00"));
        expect(eventDates[0].getQuantityRequired()).toBe(2);
        expect(eventDates[1].getDateTime()).toEqual(new Date("2024-01-01T19:00:00"));
        expect(eventDates[1].getQuantityRequired()).toBe(3);
    });

    it("should not add eventDateTime if already exists", () => {
        expect(() => {
            const event = Event.create({ name: "Evento teste" });
            event.addEventDate(new Date("2024-01-01T10:00:00"), 2);
            event.addEventDate(new Date("2024-01-01T19:00:00"), 3);
            event.addEventDate(new Date("2024-01-01T19:00:00"), 3);
        }).toThrow(new Error("Event date already exists"));
    });

    it("should add person to an Event", () => {
        const event = Event.create({ name: "Evento teste" });
        const person1Id = new Id();
        const person2Id = new Id();
        const person3Id = new Id();
        event.addPerson(person1Id);
        event.addPerson(person2Id);
        event.addPerson(person3Id);
        expect(event.getPersons()).toHaveLength(3);
        expect(event.getPersons()).toEqual([person1Id, person2Id, person3Id]);
    });

    it("should not add person to an Event more than once", () => {
        expect(() => {
            const event = Event.create({ name: "Evento teste" });
            const person1Id = new Id();
            event.addPerson(person1Id);
            event.addPerson(person1Id);            
        }).toThrow(new Error("Person already registered"));        
    });
});