import { EventRepositoryMemory } from "../infra/repositories/EventRepositoryMemory";
import { CreateEvent } from "./CreateEvent";

describe("Create Event usecase unit tests", () => {
    it("should create an Event", async () => {
        const eventRepository = new EventRepositoryMemory();
        const createEventUsecase = new CreateEvent(eventRepository);
        const createEventInput = {
            name: "Evento teste",
            description: "Descrição evento teste",
            dates: [
                {dateTime: new Date("2024-01-01T08:00:00"), quantityRequired: 5},
                {dateTime: new Date("2024-01-01T10:00:00"), quantityRequired: 3},
                {dateTime: new Date("2024-01-01T19:00:00"), quantityRequired: 3},
            ]
        };
        const createEventOutput = await createEventUsecase.execute(createEventInput);
        expect(createEventOutput.id).toBeDefined();
        expect(createEventOutput.name).toBe("Evento teste");
        expect(createEventOutput.description).toBe("Descrição evento teste");
    });
})