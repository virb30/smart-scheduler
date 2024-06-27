import { Entity } from "./Entity";
import { Id } from "../value-objects/Id";

type CreatePersonAvailabilityProps = {
    dateTime: Date;
}

type RestorePersonAvailabilityProps = CreatePersonAvailabilityProps & {
    id: Id
}

export class PersonAvailability extends Entity {
    constructor(readonly id: Id, readonly dateTime: Date) {
        super(id);
    }

    static create({ dateTime }: CreatePersonAvailabilityProps) {
        return new PersonAvailability(new Id(), dateTime);
    }

    static restore({ id, dateTime }: RestorePersonAvailabilityProps) {
        return new PersonAvailability(id, dateTime);
    }

    getDateTime(): Date {
        return this.dateTime;
    }

    isEqual(date: Date): boolean {
        return this.dateTime.getTime() === date.getTime()
    }
}