Rails.application.routes.draw do
   scope '/backend' do
      namespace :fixtures do
         namespace :soccer do
            match 'live' => "live_match_fixtures#index", via: [:get]
            match 'pre_match' => "pre_match_fixtures#index", via: [:get]
            match 'virtual' => "virtual_fixtures#index", via: [:get]
         end
      end
      resources :deposits, only: [:index]
      resources :withdraws, only: [:index]
      resources :soccer_fixtures, only: [:index, :update]
      match 'users' => "bet_users#index", via: [:get]
      match 'betstop_reasons' => "betstop_reasons#index", via: [:get]
      match 'betting_statuses' => "betting_statuses#index", via: [:get]
      match 'void_reasons' => "void_reasons#index", via: [:get]
      match 'match_statuses' => "match_statuses#index", via: [:get]
      #match 'fixtures' => "fixtures#index", via: [:get]
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
