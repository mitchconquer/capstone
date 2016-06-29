class CategoriesFeedSource < ActiveRecord::Base
  belongs_to :feed_source,
      primary_key: :id,
      foreign_key: :feed_source_id,
      class_name: :FeedSource

  belongs_to :category,
      primary_key: :id,
      foreign_key: :category_id,
      class_name: :Category
end
