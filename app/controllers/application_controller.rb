class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_action :require_login
  helper_method :current_user, :require_login

  private
  def login_user!(user)
    session[:session_token] = user.reset_token!
  end

  def logout_user!(user)
    session[:session_token] = nil
    user.reset_token!
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def require_login
    redirect_to new_session_url unless !!current_user
  end
end
