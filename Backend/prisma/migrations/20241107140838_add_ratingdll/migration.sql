-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "publishDate" TIMESTAMP(3),
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "sinopsis" TEXT;
