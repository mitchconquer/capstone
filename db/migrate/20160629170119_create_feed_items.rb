class CreateFeedItems < ActiveRecord::Migration
  def change
    create_table :feed_items do |t|
      t.integer :feed_source_id, null: false
      t.string :identifier, index: true, null: false

      t.timestamps null: false
    end
  end
end
