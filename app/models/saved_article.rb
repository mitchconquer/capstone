class SavedArticle < ActiveRecord::Base
  validates :user_id, :feed_source_title, :title, :url, :body, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  def self.save_feed_item(feed_item_id)
    @feed_item = FeedItem.find(feed_item_id)
    @saved_article = SavedArticle.create(
      user_id: current_user.id, 
      feed_source_title: @feed_item.feed_source.title, 
      title: @feed_item.title,
      url: @feed_item.url,
      body: @feed_item.description,
      author: @feed_item.author,
      pub_date: @feed_item.pub_date)
  end
end
