import { Id } from "../value-objects/Id";
import { Entity } from "./Entity";

type CreateEventDateProps = {
    dateTime: Date,
    quantityRequired: number
};

type RestoreEventDateProps = CreateEventDateProps & {
    id: Id
}

export class EventDate extends Entity {

    private constructor(id: Id, readonly dateTime: Date, private quantityRequired: number) {
        super(id);
        this.validate();
    }

    static create({ dateTime, quantityRequired }: CreateEventDateProps): EventDate {
        return new EventDate(new Id(), dateTime, quantityRequired);
    }

    static restore({id, dateTime, quantityRequired }: RestoreEventDateProps): EventDate {
        return new EventDate(id, dateTime, quantityRequired);
    }

    getDateTime(): Date {
        return this.dateTime;
    }

    getQuantityRequired(): number {
        return this.quantityRequired;
    }

    changeQuantityRequired(quantityRequired: number): void {
        this.quantityRequired = quantityRequired;
        this.validate();
    }

    isEqual(dateTime: Date): boolean {
        return this.dateTime.getTime() === dateTime.getTime();
    }

    isBetween(fromDate: Date, toDate: Date): boolean {
        return this.dateTime.getTime() >= fromDate.getTime() && this.dateTime.getTime() <= toDate.getTime();
    }

    private validate() {
        if (this.quantityRequired <= 0) throw new Error("Quantity required must be greater than 0");
    }
}