export class CalculateAmountError extends Error {
    constructor() {
        super('please calculate amount for each item');
    }
}
