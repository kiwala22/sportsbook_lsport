require 'rails_helper'

RSpec.describe Fixture, type: :model do
   it { should validate_presence_of(:event_id) }
   it { should validate_uniqueness_of(:event_id) }
end
