class ChangeReadFeedRecordsTableName < ActiveRecord::Migration
  def change
    rename_table :read_feed_items, :read_feed_records
  end
end
