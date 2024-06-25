import { Person } from "../entities/Person";

export interface PersonRepository {
    save(person: Person): Promise<void>;
}