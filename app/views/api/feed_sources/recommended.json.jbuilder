@recommended.keys.each do |id|
  json.set! id do
    json.partial! "/api/feed_sources/recommended", category: @recommended[id]
  end
end