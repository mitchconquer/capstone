json.id feed_source.id
json.title feed_source.title
json.url feed_source.url
json.feedUrl feed_source.feed_url
json.imageUrl feed_source.image_url
json.set! :feedItems do
  feed_source.feed_items.each do |item|
    json.set! item.id do
      json.partial! "/api/feed_items/feed_item", feed_item: item
      json.set! :read, read_feed_items.include?(item)
    end
  end
end