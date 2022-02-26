export class ValidationRequiredFieldsError extends Error {
    constructor(field: string) {
        super(`This ${field} field is required`);
    }
}
