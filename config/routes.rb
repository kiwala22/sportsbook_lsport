Rails.application.routes.draw do
   scope '/backend' do
      namespace :fixtures do
         namespace :soccer do
            match 'live_match_fixtures' => "live_match_fixtures#index", via: [:get]
            match 'pre_match_fixtures' => "pre_match_fixtures#index", via: [:get]
            match 'virtual_fixtures' => "virtual_fixtures#index", via: [:get]
            patch 'live_match_fixtures' => "live_match_fixtures#update"
            patch 'pre_match_fixtures' => "pre_match_fixtures#update"
            patch 'virtual_fixtures' => "virtual_fixtures#update"
         end
      end
      resources :deposits, only: [:index]
      resources :withdraws, only: [:index]
      match 'users' => "bet_users#index", via: [:get]
      match 'betstop_reasons' => "betstop_reasons#index", via: [:get]
      match 'betting_statuses' => "betting_statuses#index", via: [:get]
      match 'void_reasons' => "void_reasons#index", via: [:get]
      match 'match_statuses' => "match_statuses#index", via: [:get]
   end

   namespace :amqp do
      namespace :v1  do
         match 'alerts' => 'alerts#create', via: [:post]
         
         namespace :sports do
            match 'soccer' => 'soccer#create', via: [:post]
         end
      end
   end

   devise_for :users, path: 'users',  controllers: {
      sessions: 'users/sessions'
   }
   devise_for :admins, path: 'admins',  controllers:{
      sessions: 'admins/sessions'

   }
   devise_scope :admin do

      authenticated :admin do
         root :to => 'admin_landing#index', as: :authenticated_root
      end
      unauthenticated :admin do
         get '/', to: "admins/sessions#new"
      end
   end
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   devise_for :admin_users, ActiveAdmin::Devise.config
   ActiveAdmin.routes(self)

   require 'sidekiq/web'
   mount Sidekiq::Web => '/rabbit'

end
