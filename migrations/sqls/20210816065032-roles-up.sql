alter table user_credentials add column roles text[] not null default '{}';
