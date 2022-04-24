class User < ApplicationRecord
  audited
   attr_writer :login
   require 'send_sms'
   # Include default devise modules. Others available are:
   # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
   devise :database_authenticatable, :registerable, :recoverable, :rememberable,
   :validatable, :timeoutable, :trackable, authentication_keys: [:phone_number]

   has_many :bet_slips
   has_many :bets
   has_many :transactions
   has_many :deposits
   has_many :withdraws
   has_many :user_bonuses

   after_save :send_pin!
   #before_create :process_signup_bonus

   def login
      @login || self.phone_number
   end

   validates :phone_number, presence: true
   validates :phone_number, uniqueness: true
   # validates :id_number, presence: true
   # validates :id_number, uniqueness: true
  #  validates :email, uniqueness: true
   validates :phone_number, format: {with: /\A(256)\d{9}\z/}
   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :agreement, acceptance: { accept: true }
   # validate :password_complexity

    def active_for_authentication?
      super && account_active?
    end

    def inactive_message
      account_active? ? super : :account_inactive
    end

   def password_complexity
      # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
      return if password.blank? || password =~ /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/

      errors.add :password, 'Complexity requirement not met. Length should be 8-70 characters and include: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
   end

   def generate_password_reset
     verification_code = generate_codes()
     self.update(password_reset_code: verification_code)
     send_password_reset_code
   end

   def send_password_reset_code
     message = "Your BetSports Password Reset Code is #{self.password_reset_code}"
     SendSMS.process_sms_now(receiver: self.phone_number, content: message, sender_id: ENV['DEFAULT_SENDER'])
     self.touch(:password_reset_sent_at)
   end


    def reset_pin!
      pin = generate_codes()
      self.update_column(:pin, pin)
    end

    def unverify!
      self.update_column(:verified, false)
    end

    def send_pin!
      if saved_change_to_attribute?(:phone_number)
        resend_user_pin!
      end
    end

    def resend_user_pin!
      reset_pin!
      unverify!
      message = "Your BetSports Account verification code is #{self.pin}"
      SendSMS.process_sms_now(receiver: self.phone_number, content: message, sender_id: ENV['DEFAULT_SENDER'])
      # In scenarios of automatic emails, uncomment the line below
      # VerifyMailer.with(id: self.id).verification_email.deliver_now
      self.touch(:pin_sent_at)
    end

    def process_signup_bonus
      if SignUpBonus.exists? && SignUpBonus.last.status == "Active" # check if there are any bonuses on offer and if the last one is active
        # if the is present and last bonus is active
        # change the balance to the amount in the bonus
        bonus_amount = SignUpBonus.last.amount
        self.balance =  bonus_amount.to_f
        self.activated_signup_bonus = true
        self.signup_bonus_amount = bonus_amount
      end
    end

    def generate_codes
      loop {
        code = rand(000000..999999).to_s
        break code = code unless code.length != 6
       }
    end

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
