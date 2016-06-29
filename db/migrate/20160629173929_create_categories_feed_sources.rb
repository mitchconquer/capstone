class CreateCategoriesFeedSources < ActiveRecord::Migration
  def change
    create_table :categories_feed_sources do |t|
      t.integer :feed_source_id, null: false, index: true
      t.integer :category_id, null: false, index: true
      
      t.timestamps null: false
    end
  end
end
