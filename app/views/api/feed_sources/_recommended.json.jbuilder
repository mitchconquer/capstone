json.extract! category, :id, :name
json.set! :feedSources do
  json.array! category[:feed_sources] do |feed_source|
    feed_source.feed_items = []
    json.partial! "/api/feed_sources/feed_source", feed_source: feed_source
  end  
end