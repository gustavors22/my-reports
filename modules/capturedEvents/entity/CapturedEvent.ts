type CapturedEvent = {
    id?: string;
    userId: string;
    platform: string;
    event: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default CapturedEvent;