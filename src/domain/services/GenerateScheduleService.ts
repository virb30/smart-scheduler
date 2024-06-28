import { Event } from "../entities/Event";
import { Person } from "../entities/Person";

export class GenerateScheduleService {
    constructor(readonly event: Event, readonly persons: Person[]) { }

    generate(fromDate: Date, toDate: Date): any {
        const datesToGenerate = this.event.getEventDatesBetween(fromDate, toDate);

        let schedule = [];
        for(const dateToGenerate of datesToGenerate) {
            let persons = [];
            let replacements = [];
            for(const person of this.persons) {
                if (person.isAvailable(dateToGenerate.getDateTime())) {
                    if (persons.length < dateToGenerate.getQuantityRequired()) {
                        persons.push(person.getId());
                    } else {
                        replacements.push(person.getId());
                    }
                }
            }
            schedule.push({
                persons,
                replacements
            });
        }

        return {
            schedule
        }
    }
}