create table apples
(
    apple_id    serial      primary key,
    color varchar(20) not null,
    size  varchar(20) not null,
    region varchar(15) not null,
    harvest_in_ton real
);