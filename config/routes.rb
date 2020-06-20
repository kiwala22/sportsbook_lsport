Rails.application.routes.draw do
   resources :transactions, only: [:new]
   match 'deposit' => "transactions#deposit", via: [:post]
   match 'resend_verify' => "verify#create", via: [:post]
   match 'new_verify' => "verify#new", via: [:get]
   match 'send_verification' => "verify#verify_via_email", via: [:get]
   match 'verify' => "verify#update", via: [:put]
   namespace :backend do
      namespace :fixtures do
         match 'soccer_fixtures' => "soccer_fixtures#index", via: [:get]
         patch 'soccer_fixtures' => "soccer_fixtures#update", via: [:update]
         match 'virtual_soccer_fixtures' => "virtual_soccer_fixtures#index", via: [:get]
         patch 'virtual_soccer_fixtures' => "virtual_soccer_fixtures#update", via: [:update]
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
   
   devise_scope :user do
      
      authenticated :user do
         root to: 'home#index', as: :authenticated_user_root
      end
      unauthenticated :user do
         root to: "users/sessions#new", as: :unauthenticated_root
      end
   end
   devise_scope :admin do
      
      authenticated :admin do
         get '/backend' => 'admin_landing#index', as: :authenticated_admins_root
      end
      unauthenticated :admin do
         get '/backend', to: "admins/sessions#new",as: :unauthenticated_admins_root
      end
   end
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   devise_for :admin_users, ActiveAdmin::Devise.config
   ActiveAdmin.routes(self)
   
   require 'sidekiq/web'
   mount Sidekiq::Web => '/rabbit'
   
end
