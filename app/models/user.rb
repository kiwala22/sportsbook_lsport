class User < ApplicationRecord
   #attr_writer :login
   # Include default devise modules. Others available are:
   # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
   devise :database_authenticatable, :registerable, :recoverable, :rememberable,
   :validatable, :timeoutable, :trackable, authentication_keys: [:phone_number]

   # def login
   #    @login || self.phone_number
   # end

   validates :phone_number, presence: true
   validates :phone_number, uniqueness: true
   validates :phone_number, format: {with: /\A(256)\d{9}\z/}
   validates :first_name, presence: true
   validates :last_name, presence: true

   def email_required?
      false
   end

   def email_changed?
      false
   end

   # use this instead of email_changed? for Rails = 5.1.x
   def will_save_change_to_email?
      false
   end

end
