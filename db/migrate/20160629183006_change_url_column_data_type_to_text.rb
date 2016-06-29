class ChangeUrlColumnDataTypeToText < ActiveRecord::Migration
  def change
    change_column :feed_sources, :image_url, :text
    change_column :feed_sources, :url, :text
    change_column :feed_items, :identifier, :text
  end
end
