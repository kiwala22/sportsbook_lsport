class Api::V1::CurrentUserController < ApplicationController

    def check_current_user
        if user_signed_in?
            render json: {user: current_user, message: "Authorized"}
        else
            render json: {message: "Unauthorized"}
        end
    end
end