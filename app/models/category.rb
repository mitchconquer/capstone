class Category < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :feed_sources,
    through: :categories_feed_sources,
    source: :feed_source
  
  has_many :categories_feed_sources,
    primary_key: :id,
    foreign_key: :category_id,
    class_name: :CategoriesFeedSource
end
