import CapturedEvent from '../entity/CapturedEvent';

export default interface ICapturedEventsRepository {
    create(capturedEvent: CapturedEvent): Promise<CapturedEvent>;
    findByUserId(userId: string): Promise<CapturedEvent[]>;
    findByPlatform(platform: string): Promise<CapturedEvent[]>;
    findByUserIdAndPlatform(userId: string, platform: string): Promise<CapturedEvent[]>;
    findById(id: string): Promise<CapturedEvent | null>;
    delete(id: string): Promise<void>;
}