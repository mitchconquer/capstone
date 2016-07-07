json.extract! saved_article, :id, :title, :body, :author
json.set! :feedSourceTitle, saved_article.feed_source_title
json.set! :pubDate, saved_article.pub_date
unless saved_article.pub_date.nil?
  json.set! :pubDateAgo, time_ago_in_words(saved_article.pub_date)
else
  json.set! :pubDateType, ""
  json.set! :pubDateAgo, ""
end
json.set! :link, saved_article.url
json.set! :originalId, saved_article.original_id
json.set! :read, false