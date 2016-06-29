class FeedSource < ActiveRecord::Base
  validates :title, :url, :image_url, presence: true
  after_initialize :ensure_defaults

  has_many :feed_items,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :FeedSource

  has_many :categories,
    through: :categories_feed_sources,
    primary_key: :id,
    foreign_key: :category_id,
    class_name: :Category

  has_many :categories_feed_sources,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :CategoriesFeedSource

  private
  def ensure_defaults
    self.recommended ||= false
    self.image_url ||= "https://placeimg.com/500/500/nature"
  end
end
