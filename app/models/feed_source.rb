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
    source: :category

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
    feed.sanitize_entries!

    params = self.set_params(feed)

    new_feed_source = FeedSource.create(params)
    new_feed_source.refresh!
    new_feed_source
  end

  def refresh
    if (self.updated_at < 15.minutes.ago) || (self.feed_items.count < 1)
      refresh!
    end
  end

  def refresh!
    old_updated = self.updated_at
    feed = Feedjira::Feed.fetch_and_parse self.feed_url
    params = update_params(feed)
    self.update(params)
    FeedItem.reset_source_items!(self.id, feed.entries)
    puts "***************************************************************"
    puts %Q(FeedSource#refresh! for #{self.title} (id: #{self.id}))
    puts %Q(Previous Last updated: #{old_updated})
    puts %Q(Feed Items Count: #{self.feed_items.count})
    puts "***************************************************************"
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

  def update_params(feed)
    updated_params = {
      title: feed.respond_to?(:title) ? feed.title : 'No Title ¯\_(ツ)_/¯',
      url: feed.respond_to?(:url) ? feed.url : nil,
      feed_url: feed.respond_to?(:feed_url) ? feed.feed_url : nil,
      last_refreshed: Time.now
    }

    # Don't update the image if the feed is recommended
    # this way admins can set an optimal image
    unless self.recommended
      updated_params.merge({image_url: feed.respond_to?(:image_url) ? feed.image_url : nil})
    end

    updated_params
  end

  def self.set_params(feed)
    {
      title: feed.respond_to?(:title) ? feed.title : 'No Title ¯\_(ツ)_/¯',
      url: feed.respond_to?(:url) ? feed.url : nil,
      feed_url: feed.respond_to?(:feed_url) ? feed.feed_url : nil,
      image_url: feed.respond_to?(:image_url) ? feed.image_url : nil
    }
  end
end
