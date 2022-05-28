CREATE TABLE "tasks" (
  "id" serial primary key,
  "clean" varchar(120),
  "day" varchar(120),
  "hours_alotted" float
);
INSERT INTO "tasks" ("clean", "day", "hours_alotted") 
VALUES ('Bathroom', 'Saturday', 2),
('Hallway', 'Saturday', 1),
('Laundry Room', 'Sunday', 2);

SELECT * FROM "tasks";
