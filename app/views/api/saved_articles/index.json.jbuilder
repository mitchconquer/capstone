@saved_articles.each do |saved_article|
  json.set! saved_article.id do
    json.partial! "saved_article", saved_article: saved_article
  end
end