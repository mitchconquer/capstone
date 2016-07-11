json.id feed_source.id
json.title feed_source.title
json.url feed_source.url
json.feedUrl feed_source.feed_url
json.imageUrl feed_source.image_url
# Return empty object if no feed items
if feed_source.feed_items.empty?
  json.set! :feed_items, {}
else
  json.set! :feedItems do
    feed_source.feed_items.each do |item|
      json.set! item.id do
        # json.partial! "/api/feed_items/feed_item", feed_item: item
        feed_item = item
        json.extract! feed_item, :id, :title, :description, :author, :enclosure, :identifier
        json.set! :pubDate, feed_item.pub_date
        unless feed_item.pub_date.nil?
          json.set! :pubDateAgo, time_ago_in_words(feed_item.pub_date)
          json.set! :pubDateReadable, feed_item.pub_date.strftime("%B %d, %Y")
        else
          json.set! :pubDateType, feed_item.pub_date.class
          json.set! :pubDateAgo, ""
          json.set! :pubDateReadable, ""
        end
        json.set! :link, feed_item.url
        if ((defined? @read_feed_items) && (@read_feed_items != nil))
          json.set! :read, @read_feed_items.include?(feed_item)
        else
          json.set! :read, ""
        end
        if ((defined? read_feed_items) && (read_feed_items != nil))
          json.set! :read, read_feed_items.include?(item) 
        end
      end
    end
  end
end