-- -- Create enum (only if it doesn't already exist)
-- DO $$
-- BEGIN
--     IF NOT EXISTS (
--         SELECT 1
--         FROM pg_type
--         WHERE typname = 'SessionType'
--     ) THEN
--         CREATE TYPE "SessionType" AS ENUM ('ONLINE', 'OFFLINE');
--     END IF;
-- END $$;

-- -- Rename old column
-- ALTER TABLE "availability_slots"
-- RENAME COLUMN "dayOfWeek" TO "daysOfWeek";

-- -- Convert INT day -> TEXT
-- UPDATE "availability_slots"
-- SET "daysOfWeek" =
-- CASE "daysOfWeek"
--     WHEN '0' THEN 'Sunday'
--     WHEN '1' THEN 'Monday'
--     WHEN '2' THEN 'Tuesday'
--     WHEN '3' THEN 'Wednesday'
--     WHEN '4' THEN 'Thursday'
--     WHEN '5' THEN 'Friday'
--     WHEN '6' THEN 'Saturday'
-- END;

-- -- Remove old column
-- ALTER TABLE "availability_slots"
-- DROP COLUMN IF EXISTS "isBooked";

-- -- Add new columns
-- ALTER TABLE "availability_slots"
-- ADD COLUMN IF NOT EXISTS "maxStudents" INTEGER DEFAULT 50;

-- ALTER TABLE "availability_slots"
-- ADD COLUMN IF NOT EXISTS "bookedStudents" INTEGER DEFAULT 0;

-- ALTER TABLE "availability_slots"
-- ADD COLUMN IF NOT EXISTS "meetingLink" TEXT;

-- ALTER TABLE "availability_slots"
-- ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT TRUE;

-- -- nullable first
-- ALTER TABLE "availability_slots"
-- ADD COLUMN IF NOT EXISTS "price" DECIMAL(65,30);

-- ALTER TABLE "availability_slots"
-- ADD COLUMN IF NOT EXISTS "sessionType" "SessionType";

-- -- Update existing rows
-- UPDATE "availability_slots"
-- SET
--     "price" = 0,
--     "sessionType" = 'ONLINE'
-- WHERE
--     "price" IS NULL
--     OR "sessionType" IS NULL;

-- -- Make NOT NULL
-- ALTER TABLE "availability_slots"
-- ALTER COLUMN "price" SET NOT NULL;

-- ALTER TABLE "availability_slots"
-- ALTER COLUMN "sessionType" SET NOT NULL;



-- Create enum (only if it doesn't already exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'SessionType'
    ) THEN
        CREATE TYPE "SessionType" AS ENUM ('ONLINE', 'OFFLINE');
    END IF;
END $$;

-- Rename old column
ALTER TABLE "availability_slots"
RENAME COLUMN "dayOfWeek" TO "daysOfWeek";

-- Convert INTEGER column to TEXT while mapping values
ALTER TABLE "availability_slots"
ALTER COLUMN "daysOfWeek"
TYPE TEXT
USING (
    CASE "daysOfWeek"
        WHEN 0 THEN 'Sunday'
        WHEN 1 THEN 'Monday'
        WHEN 2 THEN 'Tuesday'
        WHEN 3 THEN 'Wednesday'
        WHEN 4 THEN 'Thursday'
        WHEN 5 THEN 'Friday'
        WHEN 6 THEN 'Saturday'
        ELSE 'Unknown'
    END
);

-- Remove old column
ALTER TABLE "availability_slots"
DROP COLUMN IF EXISTS "isBooked";

-- Add new columns
ALTER TABLE "availability_slots"
ADD COLUMN IF NOT EXISTS "maxStudents" INTEGER DEFAULT 50;

ALTER TABLE "availability_slots"
ADD COLUMN IF NOT EXISTS "bookedStudents" INTEGER DEFAULT 0;

ALTER TABLE "availability_slots"
ADD COLUMN IF NOT EXISTS "meetingLink" TEXT;

ALTER TABLE "availability_slots"
ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT TRUE;

ALTER TABLE "availability_slots"
ADD COLUMN IF NOT EXISTS "price" DECIMAL(65,30);

ALTER TABLE "availability_slots"
ADD COLUMN IF NOT EXISTS "sessionType" "SessionType";

-- Update existing rows
UPDATE "availability_slots"
SET
    "price" = 0,
    "sessionType" = 'ONLINE'
WHERE
    "price" IS NULL
    OR "sessionType" IS NULL;

-- Make NOT NULL
ALTER TABLE "availability_slots"
ALTER COLUMN "price" SET NOT NULL;

ALTER TABLE "availability_slots"
ALTER COLUMN "sessionType" SET NOT NULL;