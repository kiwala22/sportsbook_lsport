class Api::V1::CurrentUserController < ApplicationController

    def check_current_user
        if user_signed_in?
            render json: {user: current_user, message: "Authorized"}
        else
            render json: {message: "Unauthorized"}
        end
    end


    # def user_verification
    #     if user_signed_in? && current_user.verified?
    #         render json: {message: "Verified"}, status: 200
    #     elsif user_signed_in? && !current_user.verified?
    #         render json: {message: "Please verify your phone number first." }, status: 200
    #     else
    #         render json: {message: "Unauthorized"}, status: 400
    #     end
    # end
end