class Api::FeedItemsController < ApplicationController
  def index
    feed_sources = params[:feed_sources]
    @feed_items = FeedItem.where("feed_source_id IN (?)", feed_sources).order(pub_date: :desc).limit(20)
  end

  # Refresh one feed source and return the updated feed items
  def refresh
    FeedSource.find(params[:feed_source_id]).refresh
    feed_sources = params[:feed_sources]
    @feed_items = FeedItem.where("feed_source_id IN (?)", feed_sources).order(pub_date: :desc).limit(20)
    render :index
  end
end
