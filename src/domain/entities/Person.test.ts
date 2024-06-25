import { Id } from "../value-objects/Id";
import { Person } from "./Person";
import { PersonAvailability } from "./PersonAvailability";

describe("Person unit tests", () => {

    it("should create a person", () => {
        const availability = [
            new Date("2024-01-01T10:00:00"),
            new Date("2024-01-01T19:00:00"),
            new Date("2024-01-08T19:00:00"),
        ]
        const person = Person.create({ name: "John Doe", availability});
        expect(person).toBeInstanceOf(Person);
        expect(person.getId()).toBeDefined();
        expect(person.getName()).toBe("John Doe");
        const personAvailability = person.getAvailability();
        expect(personAvailability).toHaveLength(3);
        expect(personAvailability[0].getDateTime()).toEqual(new Date("2024-01-01T10:00:00"));
        expect(personAvailability[1].getDateTime()).toEqual(new Date("2024-01-01T19:00:00"));
        expect(personAvailability[2].getDateTime()).toEqual(new Date("2024-01-08T19:00:00"));
    });

    it("should change person name", () => {
        const person = Person.create({ name: "John Doe", availability: []});
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
});