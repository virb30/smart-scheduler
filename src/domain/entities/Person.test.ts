import { Id } from "../value-objects/Id";
import { Person } from "./Person";

describe("Person unit tests", () => {

    it("should create a person", () => {
        const person = Person.create({ name: "John Doe" });
        expect(person).toBeInstanceOf(Person);
        expect(person.getId()).toBeDefined();
        expect(person.getName()).toBe("John Doe");
    });

    it("should change person name", () => {
        const person = Person.create({ name: "John Doe" });
        person.changeName("Jane Doe");
        expect(person.getName()).toBe("Jane Doe");
    });

    it("should retore person", () => { 
        const id = new Id();
        const person = Person.restore({ id , name: "John Doe", availability: []});
        expect(person.getId()).toEqual(id.value);
        expect(person.getName()).toBe("John Doe");
        expect(person.getAvailability()).toHaveLength(0);
    });

    it("should create a person and add availability", () => {
        const person = Person.create({ name: "John Doe" });
        person.addAvailability(new Date("2024-01-01T10:00:00"));
        person.addAvailability(new Date("2024-01-01T19:00:00"));
        person.addAvailability(new Date("2024-01-08T19:00:00"));
        expect(person).toBeInstanceOf(Person);
        expect(person.getId()).toBeDefined();
        expect(person.getName()).toBe("John Doe");
        const personAvailability = person.getAvailability();
        expect(personAvailability).toHaveLength(3);
        expect(personAvailability[0].getDateTime()).toEqual(new Date("2024-01-01T10:00:00"));
        expect(personAvailability[1].getDateTime()).toEqual(new Date("2024-01-01T19:00:00"));
        expect(personAvailability[2].getDateTime()).toEqual(new Date("2024-01-08T19:00:00"));
    });

    it("should throws an error if availability already exists", () => {
        expect(() => {
            const person = Person.create({ name: "John Doe" });
            person.addAvailability(new Date("2024-01-01T10:00:00"));
            person.addAvailability(new Date("2024-01-01T19:00:00"));
            person.addAvailability(new Date("2024-01-08T19:00:00"));
            person.addAvailability(new Date("2024-01-08T19:00:00"));
        }).toThrow(new Error("Availability already exists"));
    });

    it("should return true if person is available to date", () => {
        const person = Person.create({ name: "Person test" });
        person.addAvailability(new Date("2024-01-01T08:00:00"));
        person.addAvailability(new Date("2024-01-01T10:00:00"));
        expect(person.isAvailable(new Date("2024-01-01T08:00:00"))).toBeTruthy();
    });

    it("should return false if person is not available to date", () => {
        const person = Person.create({ name: "Person test" });
        person.addAvailability(new Date("2024-01-01T10:00:00"));
        person.addAvailability(new Date("2024-01-01T19:00:00"));
        expect(person.isAvailable(new Date("2024-01-01T08:00:00"))).toBeFalsy();
    });
});