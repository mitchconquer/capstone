class CreateFeedSources < ActiveRecord::Migration
  def change
    create_table :feed_sources do |t|
      t.string :title, null: false, index: true
      t.string :url, null: false, index: true
      t.boolean :recommended, null: false, default: false
      t.integer :category_id
      t.string :image_link, null: false, default: "https://placeimg.com/500/500/nature"
      t.timestamps null: false
    end
  end
end
