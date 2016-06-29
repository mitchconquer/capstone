# Schema Information

## Feed Sources
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
url         | string    | not null, indexed
recommended | boolean   | not null, default false
image_link  | string    | not null, need a default...
category_id | integer   | foreign key

## Folders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | integer   | not null, foreign key

## Feed Items
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
feed_source_id  | integer   | foreign key
title           | string    | not null
guid            | string    | not null
body            | text      | not null

## Saved Feed Items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | foreign key
feed_id     | integer   | foreign key
title       | string    | not null
url         | string    | not null
body        | text      | not null
author      | string    | 
pub_date    | string    | 

# Categories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | integer   | not null

## Read Feed Items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | foreign key
feed_item   | integer   | foreign key

## Subscriptions
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
folder_id     | integer   | not null, foreign key
user_id       | integer   | not null, foreign key
feed_id       | integer   | not null, foreign key

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
