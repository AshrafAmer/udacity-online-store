enum Status {
    active,
    complete,
}

export type Order = {
    id: Number;
    userId: string;
    status: Status;
    totalAmount: number;
};
