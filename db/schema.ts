import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// This stores only an aggregate character counter per Finnish calendar date;
// it contains no learner text, account identifier, or IP address.
export const speechUsage = sqliteTable("speech_usage", {
  day: text("day").primaryKey(),
  characters: integer("characters").notNull().default(0),
  requests: integer("requests").notNull().default(0),
});

export {};
