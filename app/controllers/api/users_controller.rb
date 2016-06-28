class Api::UsersController < ApplicationController
  skip_before_action :require_login, only [ :new, :create ]

  def show
    @user = User.find(params[:id])
  end
end
