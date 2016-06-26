Rails.application.routes.draw do
  resources :feeds, only: [ :index ]
  root to: "feeds#index"
  get 'feeds/edit', to: 'feeds#edit'
end
