class Api::SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.create!(folder_id: params[:folder_id], feed_source_id: params[:feed_source_id], user_id: current_user.id)
    @folder = Folder.includes(:feed_sources).find(params[:folder_id])
  
    render template: "/api/folders/show"
  end

  def destroy
    @subscription = Subscription.where(folder_id: params[:folder_id], feed_source_id: params[:feed_source_id], user_id: current_user.id).first

    if @subscription
      @subscription.destroy

      @folder = Folder.includes(:feed_sources).find(params[:folder_id])
    
      render template: "api/folders/show"
      # render json: feed_source_ids
    else
      render json: 'null', status: 404
    end
  end
end
