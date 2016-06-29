class Category < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :feed_sources,
    primary_key: :id,
    foreign_key: :category_id,
    class_name: :FeedSource
  
end
