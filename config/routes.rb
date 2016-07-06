Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [ :create, :destroy ]

    resources :users, only: [ :create ]
    
    get '/feeds/recommended', to: 'feed_sources#recommended'

    resources :feed_sources, path: 'feeds', except: [ :new, :edit ]


    resources :folders, except: [ :edit, :new ]

    resources :saved_articles, except: [ :new, :edit ]

    post 'items/:id/mark_read', to: 'feed_items#mark_read'
    post 'items/:id/mark_unread', to: 'feed_items#mark_unread'
    post 'folders/:folder_id/feeds/:feed_source_id', to: 'subscriptions#create'
    delete 'folders/:folder_id/feeds/:feed_source_id', to: 'subscriptions#destroy'
  end 
end
