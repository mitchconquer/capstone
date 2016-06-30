json.extract! feed_item, :title, :description, :author, :enclosure, :identifier
json.set! :pubDate, feed_item.pub_date
unless feed_item.pub_date.nil?
  json.set! :pubDateAgo, time_ago_in_words(feed_item.pub_date)
else
  json.set! :pubDateType, feed_item.pub_date.class
  json.set! :pubDateAgo, ""
end
json.set! :link, feed_item.url
json.set! :read, @read_feed_items.include?(feed_item)