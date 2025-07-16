import fs from "node:fs/promises";

const parseDump = async () => {
  const file = await fs.readFile("db_dump.sql", { encoding: "utf8" });
  const lines = file.split("\n");

  const startRegex = /^COPY [a-zA-Z]+\.([a-zA-Z_]+)/g;
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
    return { createdAt: parseDate(createdAt), id, name };
  });

  const bookmarks = tables.get("public.bookmarks")?.map((entry) => {
    const [
      id,
      createdAt,
      _userId,
      url,
      text,
      title,
      done,
      note,
      rate,
      preview,
      doneAt,
    ] = entry;

    return {
      createdAt: parseDate(createdAt),
      done: parseBoolean(done),
      doneAt: parseDate(doneAt),
      id,
      note: parseNull(note),
      preview: parseNull(preview),
      rate: parseNumberNull(rate),
      text: parseString(text),
      title: parseString(title),
      url: parseString(url),
    };
  });

  const bookmarksTags = tables.get("public.bookmarks_tags")?.map((entry) => {
    const [_id, _createdAt, bookmarkId, tagId, _userId] = entry;
    return { bookmarkId, tagId };
  });

  const data = {
    bookmarks,
    bookmarksTags,
    tags,
  };

  await fs.writeFile("db_dump.json", JSON.stringify(data, null, 2));
};

parseDump();

const parseNull = (arg?: string) => {
  return arg === "\\N" || arg?.length === 0 ? undefined : (arg ?? undefined);
};

const parseBoolean = (arg?: string) => {
  return arg === "f" ? undefined : true;
};

const parseString = (arg?: string) => {
  return arg?.length === 0 ? undefined : arg;
};

const parseNumberNull = (arg?: string) => {
  return arg === "\\N" ? undefined : (Number(arg) ?? undefined);
};

const parseDate = (arg?: string) => {
  return arg === "\\N" || !arg ? undefined : new Date(arg).getTime();
};
