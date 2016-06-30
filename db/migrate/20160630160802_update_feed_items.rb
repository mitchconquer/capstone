class UpdateFeedItems < ActiveRecord::Migration
  def change
    add_column :feed_items, :title, :text
    add_column :feed_items, :link, :text
    add_column :feed_items, :description, :text
    add_column :feed_items, :author, :string
    add_column :feed_items, :pub_date, :datetime
    add_column :feed_items, :enclosure, :text
    add_column :feed_items, :guid, :string
  end
end
