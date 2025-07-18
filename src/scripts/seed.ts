import { defineScript } from "rwsdk/worker";

import { db, setupDb } from "@/db";

import seedData from "../../db_dump.json";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM bookmark;
    DELETE FROM tag;
    DELETE FROM bookmark_tag;
  `);

  // biome-ignore lint/suspicious/noExplicitAny: needed
  const unsafeData = seedData as any;

  const user = await db.user.findFirst();

  if (!user) {
    return;
  }

  const userId = user.id;

  await db.tag.createMany({
    // biome-ignore lint/suspicious/noExplicitAny: needed
    data: unsafeData.tags.map((entry: any) => ({
      ...entry,
      createdAt: new Date(entry.createdAt),
      userId,
    })),
  });

  await db.bookmark.createMany({
    // biome-ignore lint/suspicious/noExplicitAny: needed
    data: unsafeData.bookmarks.map((entry: any) => ({
      ...entry,
      createdAt: new Date(entry.createdAt),
      done: !!entry.done,
      doneAt: entry.doneAt ? new Date(entry.doneAt) : null,
      title: entry.title ?? "",
      url: entry.url ?? "",
      userId,
    })),
  });

  await db.bookmarkTag.createMany({
    // biome-ignore lint/suspicious/noExplicitAny: needed
    data: unsafeData.bookmarksTags.map((entry: any) => ({
      ...entry,
      id: crypto.randomUUID(),
      userId,
    })),
  });

  console.log("🌱 Finished seeding");
});
