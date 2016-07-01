require 'feedjira'

class FeedSource < ActiveRecord::Base
  validates :title, :feed_url, :image_url, presence: true
  validates :feed_url, uniqueness: true
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

  has_many :subscriptions,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :Subscription

  def read_feed_items(user)
    user.read_by_source(self.id)
  end

  def self.create_from_feedjira(url)
    # TODO: Create failure callback (see private methods below)
    feed = Feedjira::Feed.fetch_and_parse url

    self.map_feed(feed)
  end

  private
  def ensure_defaults
    self.recommended ||= false
    self.image_url ||= "https://placeimg.com/500/500/nature"
  end
  
  def self.feedjira_error
    # Return error messages
    # Perhaps should be feedjira module if used elsewhere?
  end

  def self.map_feed(feed)
    params = {
      title: feed.respond_to?(:title) ? feed.title : 'No Title ¯\_(ツ)_/¯',
      url: feed.respond_to?(:url) ? feed.url : nil,
      feed_url: feed.respond_to?(:feed_url) ? feed.feed_url : nil,
      image_url: feed.respond_to?(:image_url) ? feed.image_url : nil
    }
    
    FeedSource.create(params)
  end
end
