require 'rails_helper'

RSpec.describe BettingStatus, type: :model do
   it { should validate_presence_of(:description) }
   it { should validate_presence_of(:betting_status_id) }
   it { should validate_uniqueness_of(:betting_status_id) }
end
