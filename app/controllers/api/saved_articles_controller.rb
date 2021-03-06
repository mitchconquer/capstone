class Api::SavedArticlesController < ApplicationController

  def index
    @saved_articles = current_user.saved_articles
    render :index
  end

  def create
    parameters = saved_article_params.merge({user_id: current_user.id})
    @saved_article = SavedArticle.create!(parameters)
    render :show
  end

  def create_from_feed_item
    @saved_article = SavedArticle.save_feed_item(params[:id], current_user.id)
    render :show
  end

  def show
    @saved_article = SavedArticle.find(params[:id])
  end

  def update
    @saved_article = SavedArticle.find(params[:id])
    @saved_article.update!(saved_article_params)
    render :show
  end

  def destroy
    @saved_article = SavedArticle.find(params[:id])
    @saved_article.destroy
    render :show
  end

  def delete_by_original_id
    @saved_article = SavedArticle.find_by_original_id(params[:id])
    @saved_article.destroy
    render :show
  end

  private
  def saved_article_params
    params.require(:saved_article).permit(:title, :feed_source_title, :url, :body, :author, :pub_date, :original_id)
  end
end
