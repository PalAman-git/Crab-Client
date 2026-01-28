-- DropForeignKey
ALTER TABLE "Attention" DROP CONSTRAINT "Attention_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Attention" DROP CONSTRAINT "Attention_userId_fkey";

-- AddForeignKey
ALTER TABLE "Attention" ADD CONSTRAINT "Attention_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attention" ADD CONSTRAINT "Attention_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
