class FeedItem < ActiveRecord::Base
  validates :feed_source_id, :identifier, presence: true
  validates :identifier, uniqueness: true

  belongs_to :feed_source,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :FeedSource

end
