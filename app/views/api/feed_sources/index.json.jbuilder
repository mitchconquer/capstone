@feed_sources.each do |feed_source|
  json.set! feed_source.id do

    json.id feed_source.id
    json.title feed_source.title
    json.url feed_source.url
    json.feedUrl feed_source.feed_url
    json.imageUrl feed_source.image_url
    # Return empty object if no feed items
    json.set! :feed_items, {}
    
  end
end