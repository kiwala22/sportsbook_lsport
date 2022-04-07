# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= Admin.new
    
      if user.role == "support"
        can :manage, Broadcast
        can :manage, Fixture
        can :manage, User
      end

      can :manage, :all if user.role == "manager"
  end
end
