
CREATE DATABASE inventory;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" text unique not null,
  "password" text not null,
  "is_admin" boolean default false
);