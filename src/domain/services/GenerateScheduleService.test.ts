import { Event } from "../entities/Event";
import { Person } from "../entities/Person";
import { GenerateScheduleService } from "./GenerateScheduleService";

describe("GenerateSchedule servce unit tests", () => {

    it("should generate schedule", () => {
        const event = Event.create({ name: "Evento de teste", description: "Primeiro evento do scheduler" });
        event.addEventDate(new Date("2024-06-22T19:00:00"), 3);
        event.addEventDate(new Date("2024-06-23T08:00:00"), 5);
        event.addEventDate(new Date("2024-06-23T10:00:00"), 3);
        event.addEventDate(new Date("2024-06-23T19:00:00"), 3);

        const persons = [
            Person.create({ name: "Pessoa 1" }),
            Person.create({ name: "Pessoa 2" }),
            Person.create({ name: "Pessoa 3" }),
            Person.create({ name: "Pessoa 4" }),
            Person.create({ name: "Pessoa 5" }),
            Person.create({ name: "Pessoa 6" }),
            Person.create({ name: "Pessoa 7" }),
            Person.create({ name: "Pessoa 8" }),
            Person.create({ name: "Pessoa 9" }),
            Person.create({ name: "Pessoa 10" }),
            Person.create({ name: "Pessoa 11" }),
            Person.create({ name: "Pessoa 12" }),
            Person.create({ name: "Pessoa 13" }),
            Person.create({ name: "Pessoa 14" }),
            Person.create({ name: "Pessoa 15" }),
        ];

        persons[0].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[1].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[2].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[3].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[4].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[5].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[6].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[7].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[8].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[9].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[10].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[11].addAvailability(new Date("2024-06-23T19:00:00"));
        persons[12].addAvailability(new Date("2024-06-23T19:00:00"));
        persons[13].addAvailability(new Date("2024-06-23T19:00:00"));    
        persons[14].addAvailability(new Date("2024-06-22T19:00:00"));
        
        const fromDate = new Date("2024-06-22T00:00:00");
        const toDate = new Date("2024-06-23T23:59:59");

        const scheduler = new GenerateScheduleService(event, persons);
        const output = scheduler.generate(fromDate, toDate);
        expect(output.schedule).toHaveLength(4)
        expect(output.schedule[0].persons).toEqual([persons[0], persons[1], persons[2]]);
        expect(output.schedule[0].replacements).toEqual([persons[14]]);
        expect(output.schedule[1].persons).toEqual([persons[3], persons[4], persons[5], persons[6], persons[7]]);
        expect(output.schedule[2].persons).toEqual([persons[8], persons[9], persons[10]]);
        expect(output.schedule[3].persons).toEqual([persons[11], persons[12], persons[13]]);
    });

    it("should generate schedule with rank", () => {
        const event = Event.create({ name: "Evento de teste", description: "Primeiro evento do scheduler" });
        event.addEventDate(new Date("2024-06-22T19:00:00"), 3);
        event.addEventDate(new Date("2024-06-23T08:00:00"), 5);
        event.addEventDate(new Date("2024-06-23T10:00:00"), 3);
        event.addEventDate(new Date("2024-06-23T19:00:00"), 3);

        const persons = [
            Person.create({ name: "Pessoa 1" }),
            Person.create({ name: "Pessoa 2" }),
            Person.create({ name: "Pessoa 3" }),
            Person.create({ name: "Pessoa 4" }),
            Person.create({ name: "Pessoa 5" }),
            Person.create({ name: "Pessoa 6" }),
            Person.create({ name: "Pessoa 7" }),
            Person.create({ name: "Pessoa 8" }),
            Person.create({ name: "Pessoa 9" }),
            Person.create({ name: "Pessoa 10" }),
            Person.create({ name: "Pessoa 11" }),
            Person.create({ name: "Pessoa 12" }),
            Person.create({ name: "Pessoa 13" }),
            Person.create({ name: "Pessoa 14" }),            
        ];

        persons[0].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[1].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[1].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[2].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[3].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[4].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[5].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[6].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[7].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[8].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[9].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[10].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[10].addAvailability(new Date("2024-06-23T19:00:00"));
        persons[11].addAvailability(new Date("2024-06-23T19:00:00"));
        persons[12].addAvailability(new Date("2024-06-23T19:00:00"));
        persons[13].addAvailability(new Date("2024-06-23T19:00:00"));            
        
        const fromDate = new Date("2024-06-22T00:00:00");
        const toDate = new Date("2024-06-23T23:59:59");

        const scheduler = new GenerateScheduleService(event, persons);
        const output = scheduler.generate(fromDate, toDate);
        expect(output.schedule).toHaveLength(4)
        expect(output.schedule[0].persons).toEqual([persons[0], persons[1], persons[2]]);
        expect(output.schedule[1].persons).toEqual([persons[3], persons[4], persons[5], persons[6], persons[7]]);
        expect(output.schedule[2].persons).toEqual([persons[8], persons[9], persons[10]]);
        expect(output.schedule[3].persons).toEqual([persons[11], persons[12], persons[13]]);
        expect(output.schedule[3].replacements).toEqual([persons[10]]);
        expect(output.schedule[1].replacements).toEqual([persons[1]]);        
    });

    it("should generate schedule with rank untie", () => {
        const event = Event.create({ name: "Evento de teste", description: "Primeiro evento do scheduler" });
        event.addEventDate(new Date("2024-06-22T19:00:00"), 3);
        event.addEventDate(new Date("2024-06-23T08:00:00"), 5);
        event.addEventDate(new Date("2024-06-23T10:00:00"), 3);
        event.addEventDate(new Date("2024-06-23T19:00:00"), 3);

        const persons = [
            Person.create({ name: "Pessoa 1" }),
            Person.create({ name: "Pessoa 2" }),
            Person.create({ name: "Pessoa 3" }),
            Person.create({ name: "Pessoa 4" }),
            Person.create({ name: "Pessoa 5" }),
            Person.create({ name: "Pessoa 6" }),
            Person.create({ name: "Pessoa 7" }),
            Person.create({ name: "Pessoa 8" }),
            Person.create({ name: "Pessoa 9" }),
            Person.create({ name: "Pessoa 10" }),
            Person.create({ name: "Pessoa 11" }),
            Person.create({ name: "Pessoa 12" }),
            Person.create({ name: "Pessoa 13" }),
            Person.create({ name: "Pessoa 14" }),            
        ];

        persons[0].addAvailability(new Date("2024-06-22T19:00:00"));
        
        persons[1].addAvailability(new Date("2024-06-22T19:00:00"));
        persons[1].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[1].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[1].addAvailability(new Date("2024-06-23T19:00:00"));

        persons[2].addAvailability(new Date("2024-06-22T19:00:00"));

        persons[3].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[4].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[5].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[6].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[7].addAvailability(new Date("2024-06-23T08:00:00"));

        persons[8].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[9].addAvailability(new Date("2024-06-23T10:00:00"));

        persons[10].addAvailability(new Date("2024-06-23T08:00:00"));
        persons[10].addAvailability(new Date("2024-06-23T10:00:00"));
        persons[10].addAvailability(new Date("2024-06-23T19:00:00"));
        
        persons[11].addAvailability(new Date("2024-06-23T19:00:00"));
        persons[12].addAvailability(new Date("2024-06-23T19:00:00"));            
        
        const fromDate = new Date("2024-06-22T00:00:00");
        const toDate = new Date("2024-06-23T23:59:59");

        const scheduler = new GenerateScheduleService(event, persons);
        const output = scheduler.generate(fromDate, toDate);
        expect(output.schedule).toHaveLength(4)
        expect(output.schedule[0].persons).toEqual([persons[0], persons[1], persons[2]]);
        expect(output.schedule[1].persons).toEqual([persons[3], persons[4], persons[5], persons[6], persons[7]]);
        expect(output.schedule[2].persons).toEqual([persons[8], persons[9], persons[10]]);
        expect(output.schedule[3].persons).toEqual([persons[11], persons[12], persons[1]]);
        expect(output.schedule[3].replacements).toEqual([persons[10]]);
        expect(output.schedule[1].replacements).toEqual([persons[10], persons[1]]);        
        expect(output.schedule[2].replacements).toEqual([persons[1]]);        
    });
});