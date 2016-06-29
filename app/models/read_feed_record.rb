class ReadFeedRecord < ActiveRecord::Base
  validates :user_id, :feed_item_id, presence: true
  validates :user_id, uniqueness: { scope: :feed_item_id, message: "user already likes this feed item" }

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :feed_item,
    primary_key: :id,
    foreign_key: :feed_item_id,
    class_name: :FeedItem

end
