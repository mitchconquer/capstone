class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      t.string :name, null: false
      t.integer :user_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
