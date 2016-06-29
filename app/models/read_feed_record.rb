class ReadFeedRecord < ActiveRecord::Base
  validates :user_id, :feed_item_id, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :feed_item,
    primary_key: :id,
    foreign_key: :feed_item_id,
    class_name: :FeedItem
end
