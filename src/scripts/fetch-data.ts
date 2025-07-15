import fs from "node:fs/promises";

// import { db } from "@/db";

const parseDump = async () => {
  const file = await fs.readFile("db_dump.sql", { encoding: "utf8" });
  const lines = file.split("\n");

  const startRegex = /^COPY [a-zA-Z]+\.([a-zA-Z]+)/g;
  const endRegex = /^\\\.$/g;

  const detectedChanges = lines
    .map((line, index) => ({
      end: line.match(endRegex),
      index,
      start: line.match(startRegex),
    }))
    .filter((changes) => changes.start || changes.end);

  const ranges = Array.from({ length: detectedChanges.length / 2 }).map(
    (_, index) => {
      const start = detectedChanges[index * 2];
      const end = detectedChanges[index * 2 + 1];
      const table = start.start?.[0].replaceAll("COPY ", "");
      return { end: end.index, start: start.index, table };
    },
  );

  const tables = new Map<string, string[][]>();

  for (const range of ranges) {
    if (range.table) {
      const rows = lines.slice(range.start + 1, range.end);
      tables.set(
        range.table,
        rows.map((row) => row.split("\t")),
      );
    }
  }

  const tags = tables.get("public.tags")?.map((entry) => {
    const [id, createdAt, name] = entry;
    const date = new Date(createdAt).getTime();
    return { createdAt: date, id, name };
  });

  const bookmarks = tables.get("public.bookmarks")?.map((entry) => {
    const [
      id,
      artistId,
      createdAt,
      sid,
      title,
      _userId,
      year,
      release,
      covers,
    ] = entry;

    return {
      _creationTime: new Date(createdAt).getTime(),
      artistId,
      covers: parseCovers(covers),
      entry,
      id,
      release: parseNull(release),
      sid: parseNull(sid),
      title,
      year: parseNumberNull(year),
    };
  });

  console.log("data", detectedChanges, ranges, bookmarks);

  // await db.$executeRawUnsafe(`\
  //   DELETE FROM User;
  //   DELETE FROM sqlite_sequence;
  // `);

  // await db.user.create({
  //   data: {
  //     createdAt: new Date(),
  //     email: "mj@test.com",
  //     emailVerified: false,
  //     id: "1",
  //     image: null,
  //     name: "test",
  //     updatedAt: new Date(),
  //   },
  console.log("🌱 Finished seeding", lines.length);
};

parseDump();

const parseCovers = (covers?: string) => {
  const parsed = parseNull(covers);

  if (!parsed) {
    return null;
  }

  const json = JSON.parse(parsed);
  const { "250": s250, "500": s500, "1200": s1200, ...reduced } = json;

  const result = {
    ...reduced,
    s250: s250?.slice(0, 12),
    s500: s500?.slice(0, 12),
    s1200: s1200?.slice(0, 12),
  };

  return result;
};

const parseNull = (arg?: string) => {
  return arg === "\\N" ? null : (arg ?? null);
};

const parseNumberNull = (arg?: string) => {
  return arg === "\\N" ? null : (Number(arg) ?? null);
};
