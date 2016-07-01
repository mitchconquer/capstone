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
    source: :feed_item

  has_many :subscriptions,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Subscription

  has_many :feed_sources,
    through: :subscriptions,
    source: :feed_source
    # Documentation says I should be able to use uniq but rails doesn't like it
    # uniq: true

  def read_by_source(feed_source_id)
    read_feed_items.where(feed_source_id: feed_source_id)
  end

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
