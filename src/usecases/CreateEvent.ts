import { Event } from "../domain/entities/Event";
import { EventRepository } from "../domain/repositories/EventRepository";
import { Usecase } from "./Usecase";

export class CreateEvent implements Usecase {

    constructor(readonly eventRepository: EventRepository) { }

    async execute(input: Input): Promise<Output> {
        const event = Event.create({ name: input.name, description: input.description });
        for(const eventDate of input.dates) {
            event.addEventDate(eventDate.dateTime, eventDate.quantityRequired);
        }
        await this.eventRepository.save(event);
        return {
            id: event.getId(),
            name: event.getName(),
            description: event.getDescription(),
        }
    }
}

type Input = {
    name: string,
    description?: string,
    dates: {
        dateTime: Date, quantityRequired: number
    }[]
};

type Output = {
    id: string,
    name: string,
    description: string
}