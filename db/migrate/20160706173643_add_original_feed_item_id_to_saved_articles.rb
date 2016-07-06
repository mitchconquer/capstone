class AddOriginalFeedItemIdToSavedArticles < ActiveRecord::Migration
  def change
    add_column :saved_articles, :original_id, :integer
  end
end
