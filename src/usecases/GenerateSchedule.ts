export class Distribute {

    async execute(input: Input): Promise<Output> {
        const event = {}// {{Data, hora}[], descrição, mínimo de voluntários}
        const staff = {}// {Nome, Disponibilidades({Data, hora}[]), quantidade de participações}[]
        const distribution = [] as any;
        return distribution;
    }
}

type Input = {
    startDate: Date;
    endDate: Date;
    eventId: string;
};

type Output = {
    distribution: {
        eventDate: Date,
        personId: string,
        eventId: string
    }[]
};