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

  def self.reset_source_items!(feed_source_id, new_feed_items)
    # Delete items if they aren't in this list
    current_feed_items = FeedItem.where(feed_source_id: feed_source_id)
    current_item_ids = []
    new_feed_items.each do |feed_item|
      params = FeedItem.set_params(feed_item).merge({feed_source_id: feed_source_id})
      id = FeedItem.update_or_create(current_feed_items, params)
      id.is_a?(Array) ? current_item_ids.concat(id) : current_item_ids.push(id)
    end
    
    # Only remove items that are more than 1.5 days old
    old_feed_items = current_feed_items.where("created_at > ?", 1.5.days.ago)
    FeedItem.remove_old_items(current_item_ids, old_feed_items.map(&:id))
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
    optimizedDescription = FeedItem.custom_sanitize(FeedItem.chooseDescription(feed_item))
    {
      title: feed_item.respond_to?(:title) ? feed_item.title : 'No Title!!!?? (╯°□°)╯︵ ┻━┻',
      url: feed_item.respond_to?(:url) ? feed_item.url : nil,
      pub_date: feed_item.respond_to?(:published) ? feed_item.published : nil,
      description: optimizedDescription,
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

  def self.chooseDescription(feed_item)
      summary = (feed_item.respond_to?(:summary) && !feed_item.summary.nil?) ? feed_item.summary : ""
      content = (feed_item.respond_to?(:content) && !feed_item.content.nil?) ? feed_item.content : ""
      summary.length > content.length ? summary : content
  end

  def self.update_or_create(current_source_items, params)
    if current_source_items.where(identifier: params[:identifier]).count > 0
      # already exists, udpate
      updated = current_source_items.where(identifier: params[:identifier]).each { |item| item.update(params) }
      return updated.map(&:id)
    else
      # doesn't exist, create
      feed_item = FeedItem.create(params)
      return feed_item.id unless feed_item.id.nil?
    end
  end

  def self.remove_old_items(current_item_ids, old_item_ids)
    old_item_ids.each do |id|
      unless current_item_ids.include?(id)
        FeedItem.destroy(id)
      end
    end
  end
end
