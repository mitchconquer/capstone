# Schema Information

## Feed Sources
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
url         | text      | not null, indexed
recommended | boolean   | not null, default false
image_url   | text      | not null, need a default...

## Feed Items
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
feed_source_id  | integer   | foreign key
identifier      | text      | not null

## Read Feed Records
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | foreign key
feed_item_id| integer   | foreign key

## Folders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | integer   | not null, foreign key

## Saved Feed Items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | foreign key
feed_id     | integer   | foreign key
title       | string    | not null
url         | text      | not null
body        | text      | not null
author      | string    | 
pub_date    | string    | 

## Categories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | integer   | not null

## Category Feed Source (Join table)
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
feed_source_id   | integer   | not null, foreign key
category_id      | integer   | not null, foreign key

## Subscriptions
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
folder_id     | integer   | not null, foreign key
user_id       | integer   | not null, foreign key
feed_id       | integer   | not null, foreign key

## Users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
