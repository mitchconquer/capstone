class AddPresenceConstraintToCategoryName < ActiveRecord::Migration
  def change
    change_column_null :categories, :name, false
  end
end
