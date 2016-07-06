class Api::SavedArticlesController < ApplicationController

  def index
    @saved_articles = current_user.saved_articles
    render :index
  end

  def create
    @saved_article = SavedArticle.create!(saved_article_params)
    render :show
  end

  def show
    @saved_article = SavedArticle.find(params[:id])
  end

  def update
    @saved_article = SavedArticle.find(params[:id]).update!(saved_article_params)
    render :show
  end

  def destroy
    @saved_article = SavedArticle.find(params[:id])
    @saved_article.destroy
    render :show
  end

  private
  def saved_article_params
    require(:saved_article).permit(:title, :feed_source_title, :title, :url, :body, :author, :pub_date)
  end
end
