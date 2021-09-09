require 'rails_helper'

RSpec.describe VoidReason, type: :model do
   it { should validate_presence_of(:description) }
   it { should validate_presence_of(:void_reason_id) }
   it { should validate_uniqueness_of(:void_reason_id) }
end
