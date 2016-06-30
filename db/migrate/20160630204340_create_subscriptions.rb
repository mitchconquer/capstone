class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :folder_id, null: false
      t.integer :user_id, null: false
      t.integer :feed_source_id, null: false

      t.timestamps null: false
    end
    add_index :subscriptions, [ :folder_id, :user_id, :feed_source_id ], unique: true
  end
end
