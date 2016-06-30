class Api::FeedSourcesController < ApplicationController

  def create
    @feed_source = FeedSource.new({url: "Test URL from controller", title: "Test Title from controller"})

    render :show
  end

  def show
    @feed_source = FeedSource.includes(:feed_items).find(params[:id])
    @read_feed_items = @feed_source.read_feed_items(current_user)

    render :show
  end
end