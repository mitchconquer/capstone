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

ActiveRecord::Schema.define(version: 20160629170119) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "feed_items", force: :cascade do |t|
    t.integer  "feed_source_id", null: false
    t.string   "identifier",     null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "feed_items", ["identifier"], name: "index_feed_items_on_identifier", using: :btree

  create_table "feed_sources", force: :cascade do |t|
    t.string   "title",                                                       null: false
    t.string   "url",                                                         null: false
    t.boolean  "recommended", default: false,                                 null: false
    t.integer  "category_id"
    t.string   "image_link",  default: "https://placeimg.com/500/500/nature", null: false
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
  end

  add_index "feed_sources", ["title"], name: "index_feed_sources_on_title", using: :btree
  add_index "feed_sources", ["url"], name: "index_feed_sources_on_url", using: :btree

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
