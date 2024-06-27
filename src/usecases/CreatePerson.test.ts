import { PersonRepositoryMemory } from "../infra/repositories/PersonRepositoryMemory";
import { CreatePerson } from "./CreatePerson";

describe("CreatePerson Usecase Unit tests", () => {

    it("should create a person", async () => {
        const personRepository = new PersonRepositoryMemory();
        const createPersonUsecase = new CreatePerson(personRepository);
        const createPersonInput = {
            name: "John Doe",
            availability: [
                new Date("2024-01-01T10:00:00")
            ]
        };
        const createPersonOutput = await createPersonUsecase.execute(createPersonInput);
        expect(createPersonOutput.id).toBeDefined();
    });
});