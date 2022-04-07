# frozen_string_literal: true

class Ability
  include CanCan::Ability


  def initialize(user)
    # if user.is_a?(Admin)
    #   if user.role == "support"
    #     can :manage, Broadcast
    #     can :manage, Fixture
    #     can :manage, User
    #   end
    #   can :manage, :all if user.role == "manager"
    # elsif user.is_a?(User)
    #   can :manage, :all
    # else
    #   cannot :manage, :all
    # end
  end
end
