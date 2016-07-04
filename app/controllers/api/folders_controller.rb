class Api::FoldersController < ApplicationController
  def index
    @folders = Folder.includes(:feed_sources).where(user_id: current_user.id)
    render :index
  end

  def create
    @folder = current_user.folders.new(params[:folder][:title])
  end

  def show
    @folder = Folder.find(params[:id])
  end

  def update
    @folder = Folder.find(params[:id])
    if @folder.update(params[:folder][:title])
      render :show
    else
      render json: { errors: @folder.errors.full_messages, form: '' }, status: 401
    end
  end

  def destroy
    @folder = Folder.find(params[:id])
    if @folder.dstroy(params[:folder][:title])
      render :show
    else
      render json: { errors: @folder.errors.full_messages, form: '' }, status: 401
    end
  end

end
