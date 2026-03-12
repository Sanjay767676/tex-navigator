import { db } from "./server/db.js";
import { events } from "./shared/schema.js";

async function checkVenues() {
  const allEvents = await db.select().from(events);
  const tbaEvents = allEvents.filter(e => e.venue.includes("TBA"));
  const nonBlockEvents = allEvents.filter(e => {
    const v = e.venue.toUpperCase();
    return !v.includes("BLOCK") && !v.includes("HOUSE") && !v.includes("GROUND");
  });

  console.log(`Total events: ${allEvents.length}`);
  console.log(`Events still showing TBA: ${tbaEvents.length}`);
  if (tbaEvents.length > 0) {
    console.log("TBA Events:", tbaEvents.map(e => e.name).join(", "));
  }

  console.log(`\nEvents without Block/House/Ground info: ${nonBlockEvents.length}`);
  nonBlockEvents.forEach(e => console.log(`- ${e.name}: ${e.venue}`));
  
  process.exit(0);
}

checkVenues();
