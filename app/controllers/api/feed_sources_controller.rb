class Api::FeedSourcesController < ApplicationController

  # #
  # Just gathers the existing records and returns them asap 
  # 
  # #
  def index
    @feed_sources = FeedSource.find(current_user.feed_sources.map { |source| source.id })
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
    if @feed_source.errors.any?
      render json: { errors: @feed_source.errors.full_messages, form: 'general'}, status: 401
    else
      render :show
    end
  rescue => error
    message = error.message.to_s + "; MsgId: " + rand(1000).to_s
    render json: { errors: [" >_< Doh! Couldn't subscribe to the feed! Could the URL be wrong?"], errorBatch: rand(1000).to_s, form: 'general'}, status: 401
  end

  def recommended
    @feed_sources = FeedSource.where(recommended: true).includes(:categories)
    @categories = Category.all
    @recommended = {}

    @categories.each do |category|
      @recommended[category.id] = {name: category.name, id: category.id, feed_sources: []}
    end

    @feed_sources.each do |feed_source|
      feed_source.categories.each do |category|
        @recommended[category.id][:feed_sources].push(feed_source)
      end
    end

    render "/api/feed_sources/recommended"
  end

  def show
    FeedSource.find(params[:id]).refresh
    @feed_source = FeedSource.find(params[:id])

    render :show
  end
end