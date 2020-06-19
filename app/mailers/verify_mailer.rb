class VerifyMailer < ApplicationMailer

  def verification_email
    #method to send verification code to user through email
    @user = User.find(params[:id])
    mail(to: @user.email, subject: "Verification Code")
  end
end
