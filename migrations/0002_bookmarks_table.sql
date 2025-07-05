-- CreateTable
CREATE TABLE "bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "done" BOOLEAN NOT NULL,
    "doneAt" BOOLEAN,
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

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookmark_tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "userId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "bookmarkId" TEXT NOT NULL,
    CONSTRAINT "bookmark_tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookmark_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookmark_tag_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "bookmark" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
