import { PersonRepositoryMemory } from "../infra/repositories/PersonRepositoryMemory";
import { CreatePerson } from "./CreatePerson";

describe("CreatePerson Usecase Unit tests", () => {

    it("should create a person", async () => {
        const personRepository = new PersonRepositoryMemory();
        const createPersonUsecase = new CreatePerson(personRepository);
        const createPersonInput = {
            name: "John Doe",
            availability: []
        };
        const createPersonOutput = await createPersonUsecase.execute(createPersonInput);
        expect(createPersonOutput.id).toBeDefined();
    });
});