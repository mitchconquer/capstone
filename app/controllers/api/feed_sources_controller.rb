class Api::FeedSourcesController < ApplicationController

  def create
    unless @feed_source = FeedSource.find_by_feed_url(params[:url])    
      @feed_source = FeedSource.create_from_feedjira(params[:url])
    end
    
    # folders = params[:folders] # folders is array of folder ID's
    folders = [1]

    Subscription.subscribe(current_user, @feed_source, folders)

    render :show
  end

  def show
    @feed_source = FeedSource.includes(:feed_items).find(params[:id])
    @read_feed_items = @feed_source.read_feed_items(current_user)

    render :show
  end
end