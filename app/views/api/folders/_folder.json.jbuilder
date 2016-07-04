json.extract! folder, :id, :name
json.set! :feedSourceIds do
  json.array! folder.feed_sources, :id, :title
end