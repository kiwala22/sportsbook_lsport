class Fixture < ApplicationRecord

   validates :event_id, presence: true
   validates :event_id, uniqueness: true

   include Betradar

   def self.check_fixtures(date)
      fixtures = fetch_fixtures(date)
   end

   def self.check_fixture_changes
      changes = fetch_fixture_changes()
   end

   def self.update_all_reasons
      betstop = update_betstop_reasons()
      status = update_betting_status()
      match_status = update_match_status()
      void_reason = update_void_reasons()
   end


end
