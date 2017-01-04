create database boiler;
\connect boiler;
create table user (
  id                int primary key not null,
  name              text not null,
  email             text not null,
  username          text not null,
  hashed_password   text not null,
  salt              text not null,
  data              json
);

create table installation (
  id                int primary key not null,
  name              text not null
);


create table collaboration (
  id                int primary key not null,
  userid            int references user (id),
  installationid    int references installation (id),
  permission        text not null
);

create table client (
  id                int primary key not null,
  installationid    int references installation (id),
  name              text not null
);

create table project (
  id                int primary key not null,
  installationid    int references installation (id),
  clientid          int references client (id),
  name              text not null
);

create table quote (
  id                int primary key not null,
  installationid    int references installation (id),
  projectid         int references project (id),
  name              text not null
);