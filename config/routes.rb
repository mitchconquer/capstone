Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [ :create, :destroy ]

    resources :users, only: [ :create ]
    
    get '/feeds/recommended', to: 'feed_sources#recommended'

    resources :feed_sources, path: 'feeds', except: [ :new, :edit ]

    resources :folders, except: [ :edit, :new ]

    post 'saved_articles/feed_item/:id', to: 'saved_articles#create_from_feed_item'
    delete 'saved_articles/delete_by_original_id/:id', to: 'saved_articles#delete_by_original_id'

    resources :saved_articles, except: [ :new, :edit ]

    resources :read_feed_records, path: 'items/read', only: [ :index ]
    post 'items/read', to: 'read_feed_records#mark_all_read'
    delete 'items/unread', to: 'read_feed_records#mark_all_unread'
    post 'items/:id/mark_read', to: 'read_feed_records#create'
    delete 'items/:id/mark_unread', to: 'read_feed_records#destroy'

    post 'folders/:folder_id/feeds/:feed_source_id', to: 'subscriptions#create'
    delete 'folders/:folder_id/feeds/:feed_source_id', to: 'subscriptions#destroy'
  end 
end
