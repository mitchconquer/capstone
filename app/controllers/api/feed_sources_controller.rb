class Api::FeedSourcesController < ApplicationController
  def show
    @feed_source = FeedSource.includes(:feed_items).find(params[:id])
    @read_feed_items = @feed_source.read_feed_items(current_user)

    render :show
  end
end