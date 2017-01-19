CREATE TABLE "useraccount" (
  "id"                serial primary key not null,
  "email"             text not null unique,
  "hashed_password"   text not null,
  "salt"              text not null,
  "data"              json
);

create table "installation" (
  "id"                serial primary key not null,
  "name"              text not null,
  "data"              json
);


create table "collaboration" (
  "id"                serial primary key not null,
  "useraccount"       int references "useraccount" (id),
  "installation"      int references "installation" (id),
  "permission"        text not null
);

create table "client" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id),
  "name"              text not null,
  "data"              json
);

create table "project" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id),
  "client"            int references "client" (id),
  "name"              text not null,
  "data"              json
);

create table "quote" (
  "id"                serial primary key not null,
  "installation"      int references "installation" (id),
  "project"           int references "project" (id),
  "name"              text not null,
  "data"              json
);