require 'securerandom'

class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  has_many :read_feed_records,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :ReadFeedRecord

  has_many :read_feed_items,
    through: :read_feed_records,
    primary_key: :id,
    foreign_key: :feed_item_id,
    class_name: :FeedItem

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.update(session_token: SecureRandom.urlsafe_base64(16))
    self.session_token
  end

  def self.find_by_credentials(login_params)
    username = login_params[:username]
    password = login_params[:password]
    
    if user = User.find_by_username(username)
      return user if user.valid_password?(password)
    end
    
    false
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
