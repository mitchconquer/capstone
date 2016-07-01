class Api::SessionsController < ApplicationController
  skip_before_action :require_login, only: [ :new, :create ]

  def new
  end

  def create
    if @user = User.find_by_credentials(login_params)
      login_user!(@user)
      render :show
    else
      @user = User.new(username: login_params[:username])
      render json: { errors: ['Invalid username or password'], form: 'LoginForm'}, status: 401
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
