require 'rails_helper'

RSpec.describe BetstopReason, type: :model do
   it { should validate_presence_of(:description) }
   it { should validate_presence_of(:betstop_reason_id) }
   it { should validate_uniqueness_of(:betstop_reason_id) }
end
