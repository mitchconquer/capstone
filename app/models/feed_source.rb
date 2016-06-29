class FeedSource < ActiveRecord::Base
  validates :title, :url, :image_url, presence: true
  after_initialize :ensure_defaults

  has_many :feed_items,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :FeedItem

  has_many :categories,
    through: :categories_feed_sources,
    source: :Category

  has_many :categories_feed_sources,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :CategoriesFeedSource

  def read_items
    self.feed_items.where({})
  end

  def read_feed_items
    current_user.read_by_source(self.id)
  end

  private
  def ensure_defaults
    self.recommended ||= false
    self.image_url ||= "https://placeimg.com/500/500/nature"
  end
end
