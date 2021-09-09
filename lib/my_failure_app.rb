class MyFailureApp < Devise::FailureApp
   def route(scope)
      scope.to_sym == :user ? :new_session_url : super
   end
end