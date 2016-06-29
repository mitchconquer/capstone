class Api::UsersController < ApplicationController
  skip_before_action :require_login, only: [ :new, :create ]

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages, form: 'SignupForm' }, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
