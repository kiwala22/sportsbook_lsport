Rails.application.routes.draw do

  match '/faqs', to: "footer_tabs#faqs", via: [:get]
  match '/rules', to: "footer_tabs#rules", via: [:get]
  match '/contacts', to: "footer_tabs#contacts", via: [:get]
  match '/terms', to: "footer_tabs#terms", via: [:get]
  match '/privacy', to: "footer_tabs#privacy", via: [:get]
   # Serve websocket cable requests in-process
   mount ActionCable.server => '/cable'

   root to: 'fixtures/soccer/pre_match#index'

   namespace :confirmation do
      match 'airtel/payment' => 'airtel_uganda#create', via: [:post, :get]
      match 'mtn/payment' => 'mtn_uganda#create', via: [:post, :get]
   end

   resources :bet_slips, only: [:index, :create, :show]
   match '/refresh_slip', to: "line_bets#refresh", via: [:post]
   match '/page_refresh', to: "fixtures/soccer/pre_match#page_refresh", via: [:get]
   match '/virtual_page_refresh', to: "fixtures/virtual_soccer/pre_match#page_refresh", via: [:get]
   match '/add_bet', to: "line_bets#create", via: [:post]
   match '/clear_slip', to: "line_bets#destroy", via: [:delete]
   match '/clear_bet', to: "line_bets#line_bet_delete", via: [:delete]

   match 'password_reset' => "password_reset#new", via: [:post, :get]
   match 'reset' => "password_reset#create", via: [:put]
   match 'verify_reset' => "password_reset#edit", via: [:post, :get]
   match 'password_update' => "password_reset#update", via: [:put]

   namespace :fixtures do
      match 'search' => 'search#index', via: [:get]
      namespace :soccer do
         match 'pres' => 'pre_match#index', via: [:get]
         match 'pre' => 'pre_match#show', via: [:get]
         match 'lives' => 'live_match#index', via: [:get]
         match 'live' => 'live_match#show', via: [:get]

      end
      namespace :virtual_soccer do
         match 'pres' => 'pre_match#index', via: [:get]
         match 'pre' => 'pre_match#show', via: [:get]
         match 'lives' => 'live_match#index', via: [:get]
         match 'live' => 'live_match#show', via: [:get]
      end
   end

   resources :transactions, only: [:new, :index]
   match 'deposit' => "transactions#deposit", via: [:post]
   match 'transfer' => "transactions#transfer", via: [:get]
   match 'withdraw' => "transactions#withdraw", via: [:post]
   match 'resend_verify' => "verify#create", via: [:post]
   match 'new_verify' => "verify#new", via: [:get]
   match 'send_verification' => "verify#verify_via_email", via: [:get]
   match 'verify' => "verify#update", via: [:put]

   namespace :backend do
      namespace :fixtures do
         match 'soccer_fixtures' => "soccer_fixtures#index", via: [:get]
         match 'soccer_fixtures' => "soccer_fixtures#update", via: [:put]
         match 'fixture_recovery' => "recover_messages#index", via: [:get]
         match 'fixture_recovery' => "recover_messages#update", via: [:put]
         match 'soccer_fixtures_feature' => "soccer_fixtures#feature_update", via: [:put]
         match 'virtual_soccer_fixtures' => "virtual_soccer_fixtures#index", via: [:get]
         patch 'virtual_soccer_fixtures' => "virtual_soccer_fixtures#update", via: [:update]
      end
      resources :deposits, only: [:index]
      resources :withdraws, only: [:index]
      get '/api_user_keys/:id', to: 'api_users#generate_api_keys', as: 'user_keys'
      resources :api_users, only: [:new, :index, :create]
      match 'users' => "bet_users#index", via: [:get]
      match 'betstop_reasons' => "betstop_reasons#index", via: [:get]
      match 'betting_statuses' => "betting_statuses#index", via: [:get]
      match 'void_reasons' => "void_reasons#index", via: [:get]
      match 'match_statuses' => "match_statuses#index", via: [:get]
      match 'transactions_analytics' => "transactions_analytics#index", via: [:get]
      match 'suspend' => "bet_users#deactivate_account", via: [:post]
      match 'activate' => "bet_users#activate_account", via: [:post]
      match 'bet_slips' => "bet_slips#index", via: [:get]
      match 'bet_slip' => "bet_slips#show", via: [:get]
      match 'bets' => "bets#index", via: [:get]
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

   devise_for :admins, :skip => [:registrations], path: 'admins',  controllers:{
      sessions: 'admins/sessions'

   }
   get '/404.html' => 'users/registrations#edit'
   #get 'users/sessions/edit' => redirect('/404.html')
   get 'admins/sign_up' => redirect('/404.html')
   devise_scope :admin do

      authenticated :admin do
         get '/backend' => 'backend/admin_landing#index', as: :authenticated_admins_root
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
