# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160707044011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "categories", ["name"], name: "index_categories_on_name", unique: true, using: :btree

  create_table "categories_feed_sources", force: :cascade do |t|
    t.integer  "feed_source_id", null: false
    t.integer  "category_id",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "categories_feed_sources", ["category_id"], name: "index_categories_feed_sources_on_category_id", using: :btree
  add_index "categories_feed_sources", ["feed_source_id"], name: "index_categories_feed_sources_on_feed_source_id", using: :btree

  create_table "feed_items", force: :cascade do |t|
    t.integer  "feed_source_id", null: false
    t.text     "identifier",     null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.text     "title",          null: false
    t.text     "url"
    t.text     "description"
    t.string   "author"
    t.datetime "pub_date"
    t.text     "enclosure"
    t.string   "guid"
  end

  add_index "feed_items", ["identifier"], name: "index_feed_items_on_identifier", using: :btree

  create_table "feed_sources", force: :cascade do |t|
    t.string   "title",                                                          null: false
    t.text     "feed_url",                                                       null: false
    t.boolean  "recommended",    default: false,                                 null: false
    t.text     "image_url",      default: "https://placeimg.com/500/500/nature", null: false
    t.datetime "created_at",                                                     null: false
    t.datetime "updated_at",                                                     null: false
    t.text     "url"
    t.time     "last_refreshed"
  end

  add_index "feed_sources", ["feed_url"], name: "index_feed_sources_on_feed_url", unique: true, using: :btree
  add_index "feed_sources", ["title"], name: "index_feed_sources_on_title", using: :btree

  create_table "folders", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "folders", ["user_id"], name: "index_folders_on_user_id", using: :btree

  create_table "read_feed_records", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.integer  "feed_item_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "read_feed_records", ["feed_item_id"], name: "index_read_feed_records_on_feed_item_id", using: :btree
  add_index "read_feed_records", ["user_id"], name: "index_read_feed_records_on_user_id", using: :btree

  create_table "saved_articles", force: :cascade do |t|
    t.integer  "user_id",           null: false
    t.string   "feed_source_title", null: false
    t.string   "title",             null: false
    t.text     "url",               null: false
    t.text     "body",              null: false
    t.string   "author"
    t.time     "pub_date"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "original_id"
  end

  add_index "saved_articles", ["user_id"], name: "index_saved_articles_on_user_id", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "folder_id",      null: false
    t.integer  "user_id",        null: false
    t.integer  "feed_source_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "subscriptions", ["folder_id", "user_id", "feed_source_id"], name: "index_subscriptions_on_folder_id_and_user_id_and_feed_source_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
