class CreateSavedArticles < ActiveRecord::Migration
  def change
    create_table :saved_articles do |t|
      t.integer :user_id, index: true, null: false
      t.string :feed_source_title, null: false
      t.string :title, null: false
      t.text :url, null: false
      t.text :body, null: false
      t.string :author
      t.time :pub_date

      t.timestamps null: false
    end
  end
end
