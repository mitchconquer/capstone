class Api::FeedSourcesController < ApplicationController

  def index
    # Get all of current user's feeds
    # TODO: Way to include feed_items with feed sources and get all read feed items as array or something
    @feed_sources = current_user.feed_sources
    @read_feed_items = []
    render :index
  end

  def create
    unless @feed_source = FeedSource.find_by_feed_url(params[:url])    
      @feed_source = FeedSource.create_from_feedjira(params[:url])
    end
    
    # folders = params[:folders] # folders is array of folder ID's
    folder = params[:folderId].to_i

    Subscription.subscribe(current_user, @feed_source, folder)

    # @read_feed_items = []

    render :show
  end

  def show
    @feed_source = FeedSource.includes(:feed_items).find(params[:id])
    @feed_source.refresh
    @read_feed_items = @feed_source.read_feed_items(current_user)

    render :show
  end
end