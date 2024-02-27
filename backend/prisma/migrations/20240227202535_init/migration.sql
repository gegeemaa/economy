/*
  Warnings:

  - Added the required column `fileName` to the `IncomingInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IncomingInvoice` ADD COLUMN `fileName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `fileName` VARCHAR(191) NOT NULL;
