class FixFeedSourceImageLinkColumnName < ActiveRecord::Migration
  def change
    rename_column :feed_sources, :image_link, :image_url
  end
end
