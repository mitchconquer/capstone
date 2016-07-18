json.set! :feedItems do
  json.array! @feed_items do |feed_item|
    json.extract! feed_item, :id, :title, :description, :author, :enclosure, :identifier
    json.set! :link, feed_item.url
    json.set! :pubDate, feed_item.pub_date
    json.set! :sourceTitle, @feed_source_titles[feed_item.feed_source_id]

    unless feed_item.pub_date.nil?
      json.set! :pubDateAgo, distance_of_time_in_words(feed_item.pub_date, Time.now.utc)
      json.set! :pubDateReadable, feed_item.pub_date.strftime("%B %d, %Y")
    else
      json.set! :pubDateType, feed_item.pub_date.class
      json.set! :pubDateAgo, ""
      json.set! :pubDateReadable, ""
    end
  end
end