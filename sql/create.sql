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

create table "client" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "name"              text not null,
  "meta"              json
);

create table "project" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "client"            int references "client" (id) on delete cascade,
  "name"              text not null,
  "meta"              json
);

create table "quote" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id) on delete cascade,
  "project"           int references "project" (id) on delete cascade,
  "name"              text not null,
  "store"             json
);

create table "commandlog" (
  "id"                serial primary key not null,
  "timestamp"         timestamp without time zone default (now() at time zone 'utc'),
  "data"              json
);
