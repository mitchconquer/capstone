Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [ :create, :destroy ]

    resources :users, only: [ :create ]

    resources :feed_sources, path: 'feeds' do
      resources :feed_items, path: 'items', only: [ :index ]
    end
  end 
end
