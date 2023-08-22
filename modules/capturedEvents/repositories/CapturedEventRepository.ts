import { prisma } from "../../config/db"

import ICapturedEventsRepository from "./ICapturedEventsRepository";
import CapturedEvent from "../entity/CapturedEvent";

class CapturedEventRepository implements ICapturedEventsRepository {
    async create(capturedEvent: CapturedEvent): Promise<CapturedEvent> {
        const createdCapturedEvent = await prisma.capturedEvents.create({
            data: capturedEvent
        });

        createdCapturedEvent.event = JSON.parse(createdCapturedEvent.event as string);

        return createdCapturedEvent as CapturedEvent;
    }

    async findByUserId(userId: string): Promise<CapturedEvent[]> {
        const capturedEvents = await prisma.capturedEvents.findMany({
            where: {
                userId
            }
        });

        return capturedEvents as CapturedEvent[];
    }

    async findByPlatform(platform: string): Promise<CapturedEvent[]> {
        const capturedEvents = await prisma.capturedEvents.findMany({
            where: {
                platform
            }
        });

        return capturedEvents as CapturedEvent[];
    }

    async findById(id: string): Promise<CapturedEvent | null>{
        const capturedEvent = await prisma.capturedEvents.findUnique({
            where: {
                id
            }
        }) as CapturedEvent;

        return capturedEvent;
    }

    async findByUserIdAndPlatform(userId: string, platform: string): Promise<CapturedEvent[]> {
        const capturedEvents = await prisma.capturedEvents.findMany({
            where: {
                userId,
                platform
            }
        });

        return capturedEvents as CapturedEvent[];
    }

    async delete(id: string): Promise<void> {
        await prisma.capturedEvents.delete({
            where: {
                id
            }
        });
    }
}

export default new CapturedEventRepository();