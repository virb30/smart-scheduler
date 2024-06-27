import { Event } from "../../domain/entities/Event";
import { EventRepository } from "../../domain/repositories/EventRepository";

export class EventRepositoryMemory implements EventRepository {

    private events: Event[] = [];

    async save(event: Event): Promise<void> {
        this.events.push(event);
    }
}