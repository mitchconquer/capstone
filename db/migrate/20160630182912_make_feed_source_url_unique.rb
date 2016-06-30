class MakeFeedSourceUrlUnique < ActiveRecord::Migration
  def change
    remove_index :feed_sources, :url
    add_index :feed_sources, :url, unique: true
  end
end
