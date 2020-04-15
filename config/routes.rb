Rails.application.routes.draw do

  resources :deposits, only: [:index]
  resources :withdraws, only: [:index]
   devise_for :users, path: 'users',  controllers: {
      sessions: 'users/sessions'
   }
   constraints subdomain: 'intnet' do
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
    end
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
