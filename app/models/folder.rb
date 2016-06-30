class Folder < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :feed_sources,
    primary_key: :id,
    foreign_key: :feed_source_id,
    class_name: :Subscription
end
