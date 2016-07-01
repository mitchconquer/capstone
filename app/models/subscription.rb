class Subscription < ActiveRecord::Base
  validates :folder_id, :user_id, :feed_source_id, presence: true
  validates :user_id, uniqueness: { scope: [ :folder_id, :feed_source_id ] }

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :feed_source,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :FeedSource

  def self.subscribe(user, feed_source, folders)
    return false unless feed_source.is_a?(FeedSource) && 
      folders.is_a?(Array) && user.is_a?(User)

    folders.each do |folder_id|
      Subscription.create({
        folder_id: folder_id, 
        feed_source_id: feed_source.id, 
        user_id: user.id })
    end

    true
  end
end
