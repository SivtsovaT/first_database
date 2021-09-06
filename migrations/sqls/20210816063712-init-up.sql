create table users
(
    user_id    serial      primary key,
    first_name varchar(20) not null,
    last_name  varchar(20) not null,
    city       varchar(15)
);

create table user_credentials
(
    user_id  serial      primary key,
    username varchar(20) not null unique,
    password varchar(20) not null,
    token    varchar(60) unique
);