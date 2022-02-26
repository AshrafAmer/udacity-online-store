export class PasswordValidationError extends Error {
    constructor(length: number) {
        super(`password not valide, it must be more than ${length} characters`);
    }
}
