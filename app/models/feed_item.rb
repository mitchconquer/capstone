class FeedItem < ActiveRecord::Base
  validates :feed_source_id, :identifier, presence: true
  validates :identifier, uniqueness: true

  belongs_to :feed_source,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :FeedSource

  has_many :read_feed_records,
    primary_key: :id,
    foreign_key: :feed_item_id,
    class_name: :ReadFeedRecord

  has_many :users,
    through: :read_feed_records,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

end
