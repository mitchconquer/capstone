class ChangeFeedItemLinkToUrl < ActiveRecord::Migration
  def change
    rename_column :feed_items, :link, :url
  end
end
