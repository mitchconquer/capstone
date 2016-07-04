json.extract! folder, :id, :name
json.set! :feedSources do
  json.array! folder.feed_sources, :id, :title
end