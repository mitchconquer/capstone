class Folder < ActiveRecord::Base
  validates :name, :user_id, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :subscriptions,
    primary_key: :id,
    foreign_key: :folder_id,
    class_name: :Subscription

  has_many :feed_sources,
    through: :subscriptions,
    source: :feed_source
end
