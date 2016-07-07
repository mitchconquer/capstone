class AddLastRefreshedTimeToFeedSources < ActiveRecord::Migration
  def change
    add_column :feed_sources, :last_refreshed, :time
  end
end
