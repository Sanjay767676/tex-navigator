import { db } from "./server/db.js";
import { events } from "./shared/schema.js";

async function checkDb() {
  try {
    const results = await db.select().from(events);
    console.log(`Total events: ${results.length}`);
    console.log("First 3 events:");
    console.log(JSON.stringify(results.slice(0, 3), null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDb();
