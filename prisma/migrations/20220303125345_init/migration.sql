-- CreateTable
CREATE TABLE "Asset" (
    "oid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "maxSupply" INTEGER NOT NULL,
    "marketCapUsd" INTEGER NOT NULL,
    "volumeUsd24Hr" INTEGER NOT NULL,
    "priceUsd" INTEGER NOT NULL,
    "changePercent24Hr" INTEGER NOT NULL,
    "vwap24Hr" INTEGER NOT NULL
);
