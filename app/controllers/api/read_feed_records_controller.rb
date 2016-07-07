class Api::ReadFeedRecordsController < ApplicationController
  def index
    @read_feed_records = current_user.read_feed_records
    render :index
  end

  def create
    @read_feed_record = curent_user.read_feed_records.create(feed_item_id: params[:id])
    render :show
  end

  def destroy
    @read_feed_record = ReadFeedRecord.find_by(user_id: current_user.id, feed_item_id: params[:id])
    @read_feed_record.destroy
    render :json, @read_feed_record.id
  end
end
