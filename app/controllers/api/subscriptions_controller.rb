class Api::SubscriptionsController < ApplicationController
  def create
  end

  def destroy
    @subscription = Subscription.where(folder_id: params[:folder_id], feed_source_id: params[:feed_source_id], user_id: current_user.id)

    unless @subscription.empty?
      feed_source_ids = []
      @subscription.each do |sub|
        feed_source_ids.push sub.feed_source_id
        Subscription.destroy(sub)
      end
      render json: feed_source_ids
    else
      render json: 'null', status: 404
    end
  end
end
