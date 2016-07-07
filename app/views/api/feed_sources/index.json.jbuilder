@feed_sources.each do |feed_source|
  json.set! feed_source.id do
    json.partial! "feed_source", feed_source: feed_source, read_feed_items: @read_feed_items
  end
end