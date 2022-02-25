export class RequiredParamsIdError extends Error {
    constructor(route: string) {
        super(`required id in ${route} is missed`);
    }
}