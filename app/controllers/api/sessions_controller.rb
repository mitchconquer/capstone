require 'byebug'

class Api::SessionsController < ApplicationController
  skip_before_action :require_login, only: [ :new, :create ]

  def new
  end

  def create
    # byebug
    if @user = User.find_by_credentials(login_params)
      # byebug
      login_user!(@user)
      render :show
    else
      @user = User.new(username: login_params[:username])
      # @user.errors = ["Invalid username or password"]
      render json: { base: ['Invalid username or password'] }, status: 401
      # render json: params
    end
  end

  def destroy
    if current_user
      logout_user!(current_user)
      render json: {}
    else
      render json: { base: ['User already logged out'] }, status: 404
    end
  end

  private
  def login_params
    params.require(:user).permit(:username, :password)
  end
end
