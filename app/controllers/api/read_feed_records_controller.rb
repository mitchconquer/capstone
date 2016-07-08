class Api::ReadFeedRecordsController < ApplicationController
  def index
    @read_feed_records = current_user.read_feed_records
    render :index
  end

  def create
    @read_feed_record = current_user.read_feed_records.create(feed_item_id: params[:id])
    render :show
  end

  def mark_all_read
    feed_item_ids = params[:feed_items]
    @read_feed_records = []

    feed_item_ids.each do |feed_item_id|
      @read_feed_records.push current_user.read_feed_records.create(feed_item_id: feed_item_id)
    end
    render :index
  end

  def mark_all_unread
    feed_item_ids = params[:feed_items]
    @read_feed_records = []

    feed_item_ids.each do |feed_item_id|
      read_feed_record = ReadFeedRecord.find_by(user_id: current_user.id, feed_item_id: feed_item_id)
      @read_feed_records.push read_feed_record
      read_feed_record.destroy
    end
    render :index
  end

  def destroy
    @read_feed_record = ReadFeedRecord.find_by(user_id: current_user.id, feed_item_id: params[:id])
    @read_feed_record.destroy
    render json: @read_feed_record.feed_item_id
  end
end
