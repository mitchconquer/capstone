class SessionsController < ApplicationController
  skip_before_action :require_login, only: [ :new, :create ]

  def new
  end

  def create
    if user = User.find_by_credentials(login_params)
      log_in!(user)
      redirect_to root
    end
    flash.now[:errors] = ["Invalid username or password"]
    @user = User.new(username: login_params[:username])
    render :new
  end

  def destroy
    if current_user
      log_out!(user)
    end
  end

  private
  def login_params
    params.require(:user).permit(:username, :password)
  end
end
