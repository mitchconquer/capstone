class Api::FoldersController < ApplicationController
  def index
    @folders = Folder.includes(:feed_sources).where(user_id: current_user.id)
    render :index
  end

  def create
    @folder = current_user.folders.create!(folder_params)
    render :show
  end

  def show
    @folder = Folder.find(params[:id])
  end

  def update
    @folder = Folder.find(params[:id])
    if @folder.update(folder_params)
      render :show
    else
      render json: { errors: @folder.errors.full_messages, errorCode: rand(1000).to_s, form: 'general' }, status: 401
    end
  end

  def destroy
    @folder = Folder.find(params[:id])
    if @folder.destroy
      render :show
    else
      render json: { errors: @folder.errors.full_messages, errorCode: rand(1000).to_s, form: 'general' }, status: 401
    end
  end

  private
  def folder_params
    params.require(:folder).permit(:name)
  end

end
