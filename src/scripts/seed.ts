import { defineScript } from "rwsdk/worker";

import { db } from "@/db";

export default defineScript(async () => {
  await db.$executeRawUnsafe(`\
    DELETE FROM User;
    DELETE FROM sqlite_sequence;
  `);

  await db.user.create({
    data: {
      createdAt: new Date(),
      email: "mj@test.com",
      emailVerified: false,
      id: "1",
      image: null,
      name: "test",
      updatedAt: new Date(),
    },
  });

  console.log("🌱 Finished seeding");
});
