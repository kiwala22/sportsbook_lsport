# frozen_string_literal: true

class AdminAbility
  include CanCan::Ability

  def initialize(user)
      if user.role == "customer service"
        can :manage, Broadcast
        can :manage, Fixture
        can :manage, User
      end
      if user.role == "service manager"
        can :manage, Broadcast
        can :manage, Fixture
        can :manage, User
        can :manage, SignUpBonus
        can :manage, SlipBonus
        can :manage, TopupBonus
      end
      can :manage, :all if user.role == "manager"
  end
end
