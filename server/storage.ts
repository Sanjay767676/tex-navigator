import { db } from "./db.js";
import { eq } from "drizzle-orm";
import {
  events,
  type EventResponse,
  type InsertEvent
} from "../shared/schema.js";

export interface IStorage {
  getEvents(): Promise<EventResponse[]>;
  getEvent(id: number): Promise<EventResponse | undefined>;
  createEvent(event: InsertEvent): Promise<EventResponse>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<EventResponse[]> {
    return await db.select().from(events);
  }

  async getEvent(id: number): Promise<EventResponse | undefined> {
    const results = await db.select().from(events).where(eq(events.id, id));
    return results[0];
  }

  async createEvent(event: InsertEvent): Promise<EventResponse> {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
