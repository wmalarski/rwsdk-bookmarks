-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "done" BOOLEAN NOT NULL,
    "doneAt" DATETIME,
    "note" TEXT,
    "preview" TEXT,
    "random" DECIMAL NOT NULL,
    "rate" INTEGER,
    "text" TEXT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookmark" ("createdAt", "done", "doneAt", "id", "note", "preview", "random", "rate", "text", "title", "updatedAt", "url", "userId") SELECT "createdAt", "done", "doneAt", "id", "note", "preview", "random", "rate", "text", "title", "updatedAt", "url", "userId" FROM "bookmark";
DROP TABLE "bookmark";
ALTER TABLE "new_bookmark" RENAME TO "bookmark";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
