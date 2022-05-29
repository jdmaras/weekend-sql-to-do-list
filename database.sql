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

SELECT * FROM "tasks";

INSERT INTO "tasks"
("clean","day","hours_alotted", "job_done")
VALUES ($1, $2, $3, $4);
