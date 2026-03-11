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
  createEvents(eventsList: InsertEvent[]): Promise<EventResponse[]>;
}

export class DatabaseStorage implements IStorage {
  private cache: EventResponse[] | null = null;
  private cacheExpiry = 0;
  private CACHE_TTL = 300000; // 5 minutes

  async getEvents(): Promise<EventResponse[]> {
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    const results = await db.select().from(events);
    this.cache = results;
    this.cacheExpiry = Date.now() + this.CACHE_TTL;
    return results;
  }

  async getEvent(id: number): Promise<EventResponse | undefined> {
    const results = await db.select().from(events).where(eq(events.id, id));
    return results[0];
  }

  async createEvent(event: InsertEvent): Promise<EventResponse> {
    const [created] = await db.insert(events).values(event).returning();
    this.cache = null; // Invalidate cache
    return created;
  }

  async createEvents(eventsList: InsertEvent[]): Promise<EventResponse[]> {
    if (eventsList.length === 0) return [];
    const created = await db.insert(events).values(eventsList).returning();
    this.cache = null; // Invalidate cache
    return created;
  }
}

export const storage = new DatabaseStorage();
