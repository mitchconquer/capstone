class AddNullFalseToFeedItemTitle < ActiveRecord::Migration
  def change
    change_column_null :feed_items, :title, false
  end
end
