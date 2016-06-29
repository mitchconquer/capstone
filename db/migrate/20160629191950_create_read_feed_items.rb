class CreateReadFeedItems < ActiveRecord::Migration
  def change
    create_table :read_feed_items do |t|
      t.integer :user_id, null: false, index: true
      t.integer :feed_item_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
