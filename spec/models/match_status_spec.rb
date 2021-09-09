require 'rails_helper'

RSpec.describe MatchStatus, type: :model do
   it { should validate_presence_of(:description) }
   it { should validate_presence_of(:match_status_id) }
   it { should validate_uniqueness_of(:match_status_id) }
end
