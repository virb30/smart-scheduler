import { Person } from "../domain/entities/Person";
import { PersonRepository } from "../domain/repositories/PersonRepository";
import { Usecase } from "./Usecase";

export class CreatePerson implements Usecase {

    constructor(readonly personRepository: PersonRepository) { }

    async execute(input: Input): Promise<Output> {
        const person = Person.create({ name: input.name });
        for (const personAvailability of input.availability) {
            person.addAvailability(personAvailability);
        }
        await this.personRepository.save(person);
        return {
            id: person.getId()
        };
    }
}

type Input = {
    name: string,
    availability: Date[]
};

type Output = {
    id: string,
};