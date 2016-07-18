require 'sanitize'

class FeedItem < ActiveRecord::Base
  validates :feed_source_id, :identifier, :title, presence: true
  validates :identifier, uniqueness: {scope: [ :feed_source_id ] }

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
    source: :User

  # TODO: only update if not the same
  # TODO: delete expired items in one query

  def ==(another_feed_item)
    [ :identifier, :url, :description, :title ].all? do |param|
      self.send(param) == another_feed_item.send(param)
    end
  end

  def same_params?(params)
    [ :identifier, :url, :description, :title ].all? do |param|
      self.send(param) == params[param]
    end
  end

  def self.reset_source_items!(feed_source_id, new_feed_items)
    
    current_feed_items = {}
    FeedItem.where(feed_source_id: feed_source_id).each do |item|
      current_feed_items[item.identifier] = item
    end

    current_item_ids = []

    new_feed_items.each do |feed_item|
      params = FeedItem.set_params(feed_item).merge({feed_source_id: feed_source_id})
      id = FeedItem.update_or_create(current_feed_items, params)
      current_item_ids.push(id)
    end
    
    # Only remove items that are more than 1.5 days old
    old_feed_item_ids = current_feed_items.values.select { |item| item.created_at > 1.5.days.ago }.map(&:id)
    FeedItem.remove_old_items(current_item_ids, old_feed_item_ids)
  end

  def self.get_identifier(feed_item)
    if feed_item.respond_to?(:guid)
      return feed_item.guid
    elsif feed_item.respond_to?(:url)
      return feed_item.url
    end
    return feed_item.title
  end

  def self.set_params(feed_item)
    optimized_description = FeedItem.custom_sanitize(FeedItem.chooseDescription(feed_item))
    optimized_pub_date = FeedItem.prevent_future_dating(feed_item)
    {
      title: feed_item.respond_to?(:title) ? Sanitize.fragment(feed_item.title, Sanitize::Config::RESTRICTED) : 'No Title!!!?? (╯°□°)╯︵ ┻━┻',
      url: feed_item.respond_to?(:url) ? feed_item.url : nil,
      pub_date: optimized_pub_date,
      description: optimized_description,
      author: feed_item.respond_to?(:author) ? feed_item.author : nil,
      enclosure: feed_item.respond_to?(:enclosure) ? feed_item.summary : nil,
      identifier: FeedItem.get_identifier(feed_item)
    }
  end

  def self.custom_sanitize(html_string)
    Sanitize.fragment(html_string, Sanitize::Config.merge(
      Sanitize::Config::RELAXED, 
      :add_attributes => {
        'a' => {'target' => '_blank'}
      }
    ))
  end

  def self.prevent_future_dating(feed_item)
    pub_date = nil
    if (feed_item.respond_to?(:published))
      pub_date = feed_item.published
      if (pub_date > Time.now)
        pub_date = Time.now
      end
    end
    pub_date
  end

  def self.chooseDescription(feed_item)
      summary = (feed_item.respond_to?(:summary) && !feed_item.summary.nil?) ? feed_item.summary : ""
      content = (feed_item.respond_to?(:content) && !feed_item.content.nil?) ? feed_item.content : ""
      summary.length > content.length ? summary : content
  end

  def self.update_or_create(current_source_items, params)
    if current_source_items[params[:identifier]]
      # update unless params are same
      to_update = current_source_items[params[:identifier]]

      to_update.update(params) unless to_update.same_params?(params)

      return to_update.id
    else
      # doesn't exist, create
      feed_item = FeedItem.create(params)
      return feed_item.id unless feed_item.id.nil?
    end
  end

  def self.remove_old_items(current_item_ids, old_item_ids)
    # TOOD: do this in 1 query
    FeedItem.destroy((old_item_ids - current_item_ids))
  end
end
