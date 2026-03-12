import { db } from "./server/db.js";
import { events } from "./shared/schema.js";

async function listDistinctVenues() {
  const allEvents = await db.select().from(events);
  const venues = new Set(allEvents.map(e => e.venue));
  console.log("Distinct Venues in DB:");
  Array.from(venues).sort().forEach(v => console.log(`- "${v}"`));
  process.exit(0);
}

listDistinctVenues();
