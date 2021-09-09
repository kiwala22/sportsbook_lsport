module Users::SessionsHelper
  def sign_out
    # session[:user_id] = nil
    # self.current_user = nil
    #Destroy only user session and keep cart sessions
  end
end
