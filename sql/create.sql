CREATE TABLE "useraccount" (
  "id"                serial primary key not null,
  "email"             text not null unique,
  "hashed_password"   text not null,
  "salt"              text not null,
  "meta"              json
);

create table "installation" (
  "id"                serial primary key not null,
  "name"              text not null,
  "meta"              json
);

create table "collaboration" (
  "id"                serial primary key not null,
  "useraccount"       int references "useraccount" (id)  on delete cascade,
  "installation"      int references "installation" (id) on delete cascade,
  "permission"        text not null
);

create table "resource" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "name"              text not null,
  "type"              text not null,
  "labels"            text[][],
  "meta"              json
);

create table "job" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "name"              text not null,
  "meta"              json
);

create table "job_access" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "useraccount"       int references "useraccount" (id)  on delete cascade,
  "job"               int references "job" (id) on delete cascade,
  "permission"        text not null
);

create table "quote" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "job"               int references "job" (id) on delete cascade,
  "name"              text not null,
  "store"             json
);

create table "commandlog" (
  "id"                serial primary key not null,
  "timestamp"         timestamp without time zone default (now() at time zone 'utc'),
  "data"              json
);
