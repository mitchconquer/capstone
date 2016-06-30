json.set! @feed_source.id do
  json.set! :feedSourceTitle, @feed_source.title
  json.set! :feedSourceUrl, @feed_source.url
  json.set! :feedSourceFeedUrl, @feed_source.feed_url
  json.set! :feedSourceImageUrl, @feed_source.image_url
  json.set! :feedItems do
    @feed_source.feed_items.each do |item|
      json.set! item.id do
        json.partial! "/api/feed_items/feed_item", feed_item: item
        # json.extract! feed_item
        json.set! :read, @read_feed_items.include?(item)
      end
    end
  end
end