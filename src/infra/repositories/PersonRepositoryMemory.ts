import { Person } from "../../domain/entities/Person";
import { PersonRepository } from "../../domain/repositories/PersonRepository";

export class PersonRepositoryMemory implements PersonRepository {
    persons: Person[] = [];

    async save(person: Person): Promise<void> {
        this.persons.push(person);
    }

}