Rails.application.routes.draw do

  root to: 'home#index'

  ##React routes
  match "cart_fixtures" => "line_bets#cart_fixtures", via: [:get]
  namespace :api do
   namespace :v1 do
      match 'check_user' => "current_user#check_current_user", via: [:get]
      match 'verification' => "current_user#user_verification", via: [:get]
      match 'home' => "home#index", via: [:get]
      match 'transactions' => "transactions#index", via: [:get]
      match 'bets' => "bets#index", via: [:get]
      namespace :fixtures do
         namespace :soccer do
           match 'live' => "live_match#index", via: [:get]
           match 'pre' => "pre_match#index", via: [:get]
           match 'pre_fixture' => "pre_match#show", via: [:get]
           match 'live_fixture' => "live_match#show", via: [:get]
         end
         namespace :virtual_soccer do
            match 'virtual_live' => "live_match#index", via: [:get]
            match 'virtual_pre' => "pre_match#index", via: [:get]
            match 'pre_fixture' => "pre_match#show", via: [:get]
            match 'live_fixture' => "live_match#show", via: [:get]
         end
         match 'search' => "search#index", via: [:get]
      end
   end
  end

  match '/faqs', to: "footer_tabs#faqs", via: [:get]
  match '/rules', to: "footer_tabs#rules", via: [:get]
  match '/contacts', to: "footer_tabs#contacts", via: [:get]
  match '/terms', to: "footer_tabs#terms", via: [:get]
  match '/privacy', to: "footer_tabs#privacy", via: [:get]
   # Serve websocket cable requests in-process
   mount ActionCable.server => '/cable'

   namespace :confirmation do
      match 'airtel/payment' => 'airtel_uganda#create', via: [:post, :get]
      match 'mtn/payment' => 'mtn_uganda#create', via: [:post, :get]
   end

   resources :bet_slips, only: [:index, :create, :show]
   match '/refresh_slip', to: "line_bets#refresh", via: [:post]
   match '/page_refresh', to: "fixtures/soccer/pre_match#page_refresh", via: [:get]
   match '/virtual_page_refresh', to: "fixtures/virtual_soccer/pre_match#page_refresh", via: [:get]
   match '/home_page_refresh', to: "home#page_refresh", via: [:get]
   match '/add_bet', to: "line_bets#create", via: [:post]
   match '/clear_slip', to: "line_bets#destroy", via: [:delete]
   match '/clear_bet', to: "line_bets#line_bet_delete", via: [:delete]
   match '/button_display', to: "line_bets#close_betslip_button_display", via: [:get]

   match 'password_reset' => "password_reset#new", via: [:get]
   match 'reset' => "password_reset#create", via: [:post]
   match 'verify_reset' => "password_reset#edit", via: [:get]
   match 'password_update' => "password_reset#update", via: [:post]

   namespace :fixtures do
      match 'search' => 'search#index', via: [:get]
      namespace :soccer do
         match 'pres' => 'pre_match#index', via: [:get]
         match 'pre' => 'pre_match#show', via: [:get]
         match 'lives' => 'live_match#index', via: [:get]
         match 'live' => 'live_match#show', via: [:get]
         match 'featured' => 'pre_match#featured', via: [:get]

      end
      namespace :virtual_soccer do
         match 'pres' => 'pre_match#index', via: [:get]
         match 'pre' => 'pre_match#show', via: [:get]
         match 'lives' => 'live_match#index', via: [:get]
         match 'live' => 'live_match#show', via: [:get]
      end
   end

   resources :transactions, only: [:index]
   match 'deposit' => "transactions#deposit", via: [:get]
   match 'perform_deposit' => "transactions#perform_deposit", via: [:post]
   match 'withdraw' => "transactions#withdraw", via: [:get]
   match 'perform_withdraw' => "transactions#perform_withdraw", via: [:post]
   match 'resend_verify' => "verify#create", via: [:post]
   match 'new_verify' => "verify#new", via: [:get]
   match 'send_verification' => "verify#verify_via_email", via: [:get]
   match 'verify' => "verify#update", via: [:post]

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
      match 'user' => "bet_users#show", via: [:get]
      match 'betstop_reasons' => "betstop_reasons#index", via: [:get]
      match 'betting_statuses' => "betting_statuses#index", via: [:get]
      match 'void_reasons' => "void_reasons#index", via: [:get]
      match 'match_statuses' => "match_statuses#index", via: [:get]
      match 'transactions_analytics' => "transactions_analytics#index", via: [:get]
      match 'suspend' => "bet_users#deactivate_account", via: [:post]
      match 'activate' => "bet_users#activate_account", via: [:post]
      match 'bet_slips' => "bet_slips#index", via: [:get]
      # match 'bet_slips/cancel' => "bet_slips#cancel", via: [:post]
      match 'bet_slip' => "bet_slips#show", via: [:get]
      match 'bets' => "bets#index", via: [:get]
      resources :broadcasts

   end

   namespace :amqp do
      namespace :v1  do
         namespace :mts  do
            match 'confirm' => 'confirm#create', via: [:post]
            match 'reply' => 'reply#create', via: [:post]
         end
      end
   end

   ## Devise routes for the react FE

   # match 'users/sign_in' => "users/sessions/create", via: [:post]


   devise_for :users, path: 'users',  controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords'
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


   get '*path' => redirect('/')

end
