import { db } from "./server/db.js";
import { events } from "./shared/schema.js";
import { eq, and, sql } from "drizzle-orm";

async function fixRemainingTba() {
  console.log("Fixing remaining TBA events...");

  // FT Paper Presenation (Typo)
  await db.update(events)
    .set({ venue: "G Block" })
    .where(and(eq(events.name, "Paper Presenation"), sql`description LIKE '%FT%'`));
  console.log("✓ Fixed FT Paper Presenation");

  // MCT Paper presentation
  await db.update(events)
    .set({ venue: "C Block" })
    .where(and(eq(events.name, "Paper presentation"), sql`description LIKE '%MCT%'`));
  console.log("✓ Fixed MCT Paper presentation");

  // MMCT Paper presentation
  await db.update(events)
    .set({ venue: "D Block" })
    .where(and(eq(events.name, "Paper presentation"), sql`description LIKE '%MMCT%'`));
  console.log("✓ Fixed MMCT Paper presentation");

  // AUTO Paper Presentation (Day 2)
  await db.update(events)
    .set({ venue: "D Block" })
    .where(and(eq(events.name, "Paper Presentation"), sql`description LIKE '%AUTO%'`));
  console.log("✓ Fixed AUTO Paper Presentation");

  process.exit(0);
}

fixRemainingTba();
