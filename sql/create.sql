CREATE TABLE "user" (
  "id"                serial primary key not null,
  "email"             text not null,
  "hashed_password"   text not null,
  "salt"              text not null,
  "data"              json
);

create table "installation" (
  "id"                serial primary key not null,
  "name"              text not null
);


create table "collaboration" (
  "id"                serial primary key not null,
  "userid"            int references "user" (id),
  "installationid"    int references "installation" (id),
  "permission"        text not null
);

create table "client" (
  "id"                serial primary key not null,
  "installationid"    int references "installation" (id),
  "name"              text not null
);

create table "project" (
  "id"                serial primary key not null,
  "installationid"    int references "installation" (id),
  "clientid"          int references "client" (id),
  "name"              text not null
);

create table "quote" (
  "id"                serial primary key not null,
  "installationid"    int references "installation" (id),
  "projectid"         int references "project" (id),
  "name"              text not null
);