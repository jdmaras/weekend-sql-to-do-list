CREATE TABLE "tasks" (
  "id" serial primary key,
  "clean" varchar(120),
  "day" varchar(120),
  "hours_alotted" float,
  "job_done" VARCHAR (1) NOT NULL
);
INSERT INTO "tasks" ("clean", "day", "hours_alotted", "job_done") 
VALUES ('Bathroom', 'Saturday', 2, 'N'),
('Hallway', 'Saturday', 1, 'N'),
('Laundry Room', 'Sunday', 'N');
--------------------------------
-- These aren't used on table --
--------------------------------
SELECT * FROM "tasks";

INSERT INTO "tasks"
("clean","day","hours_alotted", "job_done")
VALUES ($1, $2, $3, $4);


---------- NOTES ---------------
-- Wish I would have remembered that BOOLEAN 
-- default false makes it just default to false if you didn't put in the value

-- Structure tab in postico is great too look back on that

-- SELECT * FROM "todo" ORDER BY 
-- THAT ORDER BY "isCompleted", "id" LIMIT 100
-- Always try and set a limit or get in habit of it
-- that's ordering it to go by if it's completed and THEN by id
