/*
  Warnings:

  - Added the required column `userId` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "accountId" TEXT,
    CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Workflow_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Workflow" ("id", "name") SELECT "id", "name" FROM "Workflow";
DROP TABLE "Workflow";
ALTER TABLE "new_Workflow" RENAME TO "Workflow";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
