json.set! :savedArticle do
  json.partial! "saved_article", saved_article: @saved_article
end
