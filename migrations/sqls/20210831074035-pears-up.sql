create table first_express.pears
(
    id             serial,
    kind           varchar(40)   not null,
    origin_country varchar(40)   not null,
    ripening_time  varchar(40)   not null,
    amount         integer       not null check ( amount > 0),
    price_per_tree  decimal(8, 2) not null check ( price_per_tree > 0),
    primary key (id, kind, origin_country)
);