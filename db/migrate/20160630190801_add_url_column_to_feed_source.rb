class AddUrlColumnToFeedSource < ActiveRecord::Migration
  def change
    add_column :feed_sources, :url, :text
  end
end
