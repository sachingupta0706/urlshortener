import { db } from "../config/db.js";
import { shortLink } from "../drizzle/schema.js";

export const getAll = async () => {
  const rows = await db.select().from(shortLink);
  return rows.map((r) => ({
    id: r.id,
    rawUrl: r.rawUrl,
    shortCode: r.shortCode,
  }));
};

export const findByShortCode = async (code) => {
  const rows = await db.select().from(shortLink).where({ shortCode: code });
  const row = rows && rows.length ? rows[0] : null;
  if (!row) return null;
  return {
    id: row.id,
    rawUrl: row.rawUrl,
    shortCode: row.shortCode,
  };
};

export const createShortLink = async ({ rawUrl, shortCode }) => {
  await db.insert(shortLink).values({ rawUrl, shortCode });
  return { rawUrl, shortCode };
};
