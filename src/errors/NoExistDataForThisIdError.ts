export class NoExistDataForThisIdError extends Error {
    constructor(instance: string, id: string|number) {
        super(`No ${instance} data for this ${id}`);
    }
}
