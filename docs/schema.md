# Schema Information

## Feeds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
url         | string    | not null, indexed
recommended | boolean   | not null, default false
category_id | integer   | foreign key

## Feed Groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | integer   | not null, foreign key

## Articles (May be used, not sure)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
feed_id     | integer   | foreign key
title       | string    | not null
url         | string    | not null
body        | text      | not null

## Saved Articles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | foreign key
feed_id     | integer   | foreign key
title       | string    | not null
url         | string    | not null
body        | text      | not null

# Categories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | integer   | not null

## Subscriptions
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
feed_group_id | integer   | not null, foreign key
user_id       | integer   | not null, foreign key
feed_id       | integer   | not null, foreign key

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
