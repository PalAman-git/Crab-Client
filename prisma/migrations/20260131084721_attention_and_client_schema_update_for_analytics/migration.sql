-- AlterTable
ALTER TABLE "Attention" ADD COLUMN     "currency" TEXT DEFAULT 'INR',
ADD COLUMN     "invoiceNo" TEXT,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nextActionAt" TIMESTAMP(3),
ADD COLUMN     "paidAmount" INTEGER;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "lastContactedAt" TIMESTAMP(3),
ADD COLUMN     "totalBilled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPaid" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Client_userId_name_idx" ON "Client"("userId", "name");
