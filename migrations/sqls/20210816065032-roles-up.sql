alter table first_express.user_credentials add column roles text[] not null default '{}';
