import { Id } from "../value-objects/Id";
import { EventDate } from "./EventDate";

describe("EventDate unit tests", () => {
    it("should create an EventDate", () => {
        const dateTime = new Date("2024-01-01T10:00:00");
        const eventDate = EventDate.create({ dateTime, quantityRequired: 1 });
        expect(eventDate.getId()).toBeDefined();
        expect(eventDate).toBeInstanceOf(EventDate);
        expect(eventDate.getDateTime()).toBe(dateTime);
        expect(eventDate.getQuantityRequired()).toBe(1);
    });

    it("should create an EventDate and change quantityRequired", () => {
        const dateTime = new Date("2024-01-01T10:00:00");
        const eventDate = EventDate.create({ dateTime, quantityRequired: 1 });
        expect(eventDate.getQuantityRequired()).toBe(1);
        eventDate.changeQuantityRequired(3);
        expect(eventDate.getQuantityRequired()).toBe(3);
    });

    it("should not create an EventDate with invalid quantityRequired", () => {
        expect(() => {
            const dateTime = new Date("2024-01-01T10:00:00");
            EventDate.create({ dateTime, quantityRequired: 0 });
        }).toThrow(new Error("Quantity required must be greater than 0"));
    });

    it("should not change quantityRequired with invalid value", () => {
        expect(() => {
            const dateTime = new Date("2024-01-01T10:00:00");
            const eventDate = EventDate.create({ dateTime, quantityRequired: 1 });
            eventDate.changeQuantityRequired(-1);
        }).toThrow(new Error("Quantity required must be greater than 0"));
    });

    it("should restore an EventDate", () => {
        const id = new Id();
        const dateTime = new Date("2024-01-01T20:00:00");
        const eventDate = EventDate.restore({ id, dateTime, quantityRequired: 5});
        expect(eventDate).toBeInstanceOf(EventDate);
        expect(eventDate.getId()).toBe(id.value);
        expect(eventDate.getDateTime()).toBe(dateTime);
        expect(eventDate.getQuantityRequired()).toBe(5);
    });

    it("should return true if dateTime is equal", () => {
        const eventDate = EventDate.create({ dateTime: new Date("2024-01-01T20:00:00"), quantityRequired: 5 });
        expect(eventDate.isEqual(new Date("2024-01-01T20:00:00"))).toBeTruthy();
    });

    it("should return false if dateTime is different", () => {
        const eventDate = EventDate.create({ dateTime: new Date("2024-01-01T20:00:00"), quantityRequired: 5 });
        expect(eventDate.isEqual(new Date("2024-01-01T21:00:00"))).toBeFalsy();
    });
});