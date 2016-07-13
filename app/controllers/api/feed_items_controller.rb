class Api::FeedItemsController < ApplicationController
  def index
    feed_sources = params[:feed_sources]
    @feed_source_titles = {}
    FeedSource.find(feed_sources).each { |source| @feed_source_titles[source.id] = source.title}
    @feed_items = FeedItem.where("feed_source_id IN (?)", feed_sources).order(pub_date: :desc).limit(20)
  end

  # Refresh one feed source and return the updated feed items
  def refresh
    FeedSource.find(params[:feed_source_id]).refresh
    feed_sources = params[:feed_sources]
    @feed_source_titles = {}
    FeedSource.find(feed_sources).each { |source| @feed_source_titles[source.id] = source.title}
    @feed_items = FeedItem.where("feed_source_id IN (?)", feed_sources).order(pub_date: :desc).limit(20).offset(0)
    @feed_items = @feed_items.sort_by{ |item| item.pub_date.to_i }.reverse
    render :index
  end

  def next_page
    feed_sources = params[:feed_sources].split(",").map { |i| i.to_i }
    page = params[:page].to_i
    @feed_source_titles = {}
    FeedSource.find(feed_sources).each { |source| @feed_source_titles[source.id] = source.title}
    @feed_items = FeedItem.where("feed_source_id IN (?)", feed_sources).order(pub_date: :desc).limit(20).offset(20 * page)
    @feed_items = @feed_items.sort_by{ |item| item.pub_date.to_i }.reverse
    render :index
  end
end
