class FeedSource < ActiveRecord::Base
  validates :title, :url, :recommended, :image_url, presence: true
  after_initialize :ensure_defaults

  has_many :feed_items,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :FeedSource

  belongs_to :category,
    primary_key: :id,
    foreign_key: :category_id,
    class_name: :Category

  private
  def ensure_defaults
    self.recommended ||= false
    self.image_url ||= "https://placeimg.com/500/500/nature"
  end
end
