/*
  Warnings:

  - Added the required column `recipientId` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "recipientId" TEXT NOT NULL,
ADD COLUMN     "requesterId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "confirmed" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "eventType" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "resetToken" TEXT;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
