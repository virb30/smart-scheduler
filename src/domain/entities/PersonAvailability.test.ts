import { Id } from "../value-objects/Id";
import { PersonAvailability } from "./PersonAvailability";

describe("PersonAvailability unit tests", () => {

    it("should create a person availability", () => {
        const dateTime = new Date("2024-01-01T10:00:00");
        const personAvailability = PersonAvailability.create({ dateTime });
        expect(personAvailability.getDateTime()).toBe(dateTime);
    });

    it("should restore a person availability", () => {
        const dateTime = new Date("2024-01-01T10:00:00");
        const id = new Id();
        const personAvailability = PersonAvailability.restore({ id, dateTime });
        expect(personAvailability.getDateTime()).toBe(dateTime);
        expect(personAvailability.getId()).toBe(id.value);
    });

    it("should return true if time is equal", () => {        
        const personAvailability = PersonAvailability.create({ dateTime:  new Date("2024-01-01T10:00:00") });
        expect(personAvailability.isEqual(new Date("2024-01-01T10:00:00"))).toBeTruthy();
    });

    it("should return false if time is different", () => {        
        const personAvailability = PersonAvailability.create({ dateTime:  new Date("2024-01-01T10:00:00") });
        expect(personAvailability.isEqual(new Date("2024-01-02T10:00:00"))).toBeFalsy();
    });
});