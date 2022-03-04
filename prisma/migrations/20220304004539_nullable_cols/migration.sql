-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "oid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supply" INTEGER,
    "maxSupply" INTEGER,
    "marketCapUsd" INTEGER,
    "volumeUsd24Hr" INTEGER,
    "priceUsd" INTEGER,
    "changePercent24Hr" INTEGER,
    "vwap24Hr" INTEGER
);
INSERT INTO "new_Asset" ("changePercent24Hr", "id", "marketCapUsd", "maxSupply", "name", "oid", "priceUsd", "rank", "supply", "symbol", "volumeUsd24Hr", "vwap24Hr") SELECT "changePercent24Hr", "id", "marketCapUsd", "maxSupply", "name", "oid", "priceUsd", "rank", "supply", "symbol", "volumeUsd24Hr", "vwap24Hr" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
