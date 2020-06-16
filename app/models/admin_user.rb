class AdminUser < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, 
    :recoverable, :rememberable, :validatable
    
    attr_writer :login
    
    def login
        @login || self.email
    end
end
