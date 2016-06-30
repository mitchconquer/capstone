class ChangeFeedSourceUrlToFeedUrl < ActiveRecord::Migration
  def change
    rename_column :feed_sources, :url, :feed_url
  end
end
