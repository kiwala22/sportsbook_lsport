Rails.application.routes.draw do

   devise_for :users, path: 'users',  controllers: {
      sessions: 'users/sessions'
   }
   constraints subdomain: 'intnet' do
      devise_for :admins, path: 'admins',  controllers:{
         sessions: 'admins/sessions'
      }
      devise_scope :admin do
         get '/', to: "admins/sessions#new"
      end

   end
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
