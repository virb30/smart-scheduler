import { Event } from "../entities/Event";
import { Person } from "../entities/Person";

export class GenerateScheduleService {
    private personsList: {
        person: Person,
        rank: number,
        index: number,
    }[] = []



    constructor(readonly event: Event, readonly persons: Person[]) { 
        this.personsList = persons.map((person, index) => ({
            person,
            rank: 0,
            index
        }))
    }

    // Event 
    // Event_dates
        // id_event
    // Person
    // PersonAvailability
        // id_person
    // Schedule
        // id_event
        // id_person
        // type = 'regular', 'replacement'
        // date
        // hora

    generate(fromDate: Date, toDate: Date): any {
        const datesToGenerate = this.event.getEventDatesBetween(fromDate, toDate);

        let schedule = [];
        for(const dateToGenerate of datesToGenerate) {
            let persons = [];
            let replacements = [];
            this.sortPersonsList();
            for(let i = 0; i < this.personsList.length; i++) {
                const { person } = this.personsList[i];
                if (person.isAvailable(dateToGenerate.getDateTime())) {
                    if (persons.length < dateToGenerate.getQuantityRequired()) {
                        this.personsList[i].rank += 1;
                        persons.push(person);
                    } else {
                        replacements.push(person);
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

    private sortPersonsList()
    {
       this.personsList.sort((a, b) => {
            if (a.rank === b.rank) {
                return a.index - b.index;
            }
            return a.rank - b.rank;
        });
    }
}