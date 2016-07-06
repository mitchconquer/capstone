class SavedArticle < ActiveRecord::Base
  validates :user_id, :feed_source_title, :title, :url, :body, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
end
