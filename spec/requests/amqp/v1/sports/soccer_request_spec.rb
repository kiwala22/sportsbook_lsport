require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe "Amqp::V1::Sports::Soccers", type: :system, js: true do
    Sidekiq::Worker.clear_all

    describe "POST requests from AMQP server" do
    	auth_token = 'k/GV8prBUWE5D8JEreycbgT+'

    	fixture = Fixture.joins(:market1_pre).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).limit(1)[0]

		user = User.create({
					email: Faker::Internet.email,
					phone_number: '25677'+ rand(1000000..9999999).to_s,
					first_name: Faker::Name.first_name,
					last_name: Faker::Name.last_name,
					password: "Jtwitw@c2016",
					password_confirmation: "Jtwitw@c2016"
				})
		user.update(verified: true)
		user.update(balance:5000)

		
		def login_form(phone_number, password)
			visit '/users/sign_in'
			fill_in 'phone_number', with: phone_number
			fill_in 'password', with: password
			click_button 'Login'
		end

       
    	#odds change
        it "successfully changes odds for a pre match event" do
        	fixture = Fixture.joins(:market1_pre).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).limit(1)[0]
	        # auth_token = 'k/GV8prBUWE5D8JEreycbgT+'
	        outcomes = ["1", "2", "3", "9", "10", "11", "12", "13", "74", "76", "1714", "1715"]
	        outcomes.each do |val|
	            instance_variable_set("@outcome_#{val}", rand(0..100)) 
	        end
	 
	        url = "http://localhost:3000/amqp/v1/sports/soccer"
	        payload = "<?xml version='1.0' encoding='UTF-8'?><odds_change product='3' event_id='#{fixture.event_id}' timestamp='1598938008993'><sport_event_status status='0' match_status='0' /><odds_generation_properties expected_totals='2.74495' expected_supremacy='-0.118261' /><odds><market favourite='1' status='1' id='16' specifiers='hcp=1'><outcome id='1714' odds='#{@outcome_1714}' probabilities='0.462633' active='1' /><outcome id='1715' odds='#{@outcome_1715}' probabilities='0.537367' active='1' /></market><market status='1' id='18' specifiers='total=2.5'><outcome id='12' odds='#{@outcome_12}' probabilities='0.683828' active='1' /><outcome id='13' odds='#{@outcome_13}' probabilities='0.316172' active='1' /></market><market status='1' id='66' specifiers='hcp=1'><outcome id='1714' odds='#{@outcome_1714}' probabilities='0.614366' active='1' /><outcome id='1715' odds='#{@outcome_1715}' probabilities='0.385634' active='1' /></market><market status='1' id='68' specifiers='total=2.5'><outcome id='12' odds='#{@outcome_12}' probabilities='0.40769' active='1' /><outcome id='13' odds='#{@outcome_13}' probabilities='0.59231' active='1' /></market><market status='1' id='75'><outcome id='9' odds='#{@outcome_9}' probabilities='0.612363' active='1' /><outcome id='10' odds='#{@outcome_10}' probabilities='0.721363' active='1' /><outcome id='11' odds='#{@outcome_11}' probabilities='0.666274' active='1' /></market><market status='1' id='60'><outcome id='1' odds='#{@outcome_1}' probabilities='0.27003' active='1' /><outcome id='2' odds='#{@outcome_2}' probabilities='0.426589' active='1' /><outcome id='3' odds='#{@outcome_3}' probabilities='0.30338' active='1' /></market><market status='1' id='29'><outcome id='74' odds='#{@outcome_74}' probabilities='0.566253' active='1' /><outcome id='76' odds='#{@outcome_76}' probabilities='0.433747' active='1' /></market><market status='1' id='10'><outcome id='9' odds='#{@outcome_9}' probabilities='0.612363' active='1' /><outcome id='10' odds='#{@outcome_10}' probabilities='0.721363' active='1' /><outcome id='11' odds='#{@outcome_11}' probabilities='0.666274' active='1' /></market><market status='1' id='1'><outcome id='1' odds='#{@outcome_1}' probabilities='0.333792' active='1' /><outcome id='2' odds='#{@outcome_2}' probabilities='0.278658' active='1' /><outcome id='3' odds='#{@outcome_3}' probabilities='0.387552' active='1' /></market><market status='1' id='63'><outcome id='9' odds='#{@outcome_9}' probabilities='0.712363' active='1' /><outcome id='10' odds='#{@outcome_10}' probabilities='0.321363' active='1' /><outcome id='11' odds='#{@outcome_11}' probabilities='0.966274' active='1' /></market></odds></odds_change>"
	        routing_key = "hi.pre.-.odds_change.1.sr:match.#{fixture.event_id}.-"
	           
            visit '/'
            find("a", :id => "show_#{fixture.id}").click

            page.evaluate_script("window.location.reload()")

            
            expect {
                uri = URI(url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.read_timeout = 180
                request = Net::HTTP::Post.new(uri.request_uri)
                request.set_form_data('payload' => payload, 'routing_key' => routing_key)
                request['access-token'] = auth_token
                response = http.request(request)
                # puts response.body
                # puts response.code
            }.to change(Soccer::OddsChangeWorker.jobs, :size).by(1)

            sleep(5)

			Sidekiq::Testing.inline! do
				OddsChangeWorker.drain
			end

            ActionCable.server.broadcast('pre_odds', record: fixture.market1_pre)
            ActionCable.server.broadcast('betslips', record: fixture.market1_pre)
            sleep(5)
            expect(page).to have_css("span", :id => "pre_1_#{fixture.id}", :text => @outcome_1)
            
        end


        #Bet Settlement 
        it 'should successfully settle bets for an event' do
        	fixture = Fixture.joins(:market1_pre).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).limit(1)[0]
	       	 
	        url = "http://localhost:3000/amqp/v1/sports/soccer"
	        payload = ""
	        routing_key = "hi.pre.-.bet_settlement.1.sr:match.#{fixture.event_id}.-"

	        login_form(user.phone_number, user.password)
			expect(page).to have_content('Upcoming Fixtures - Soccer')
			expect(page).to have_content('Betslip')
			first("#pre_1_#{fixture.id}").click
			stake = 1000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			puts ('count before: '+BetSlip.count.to_s)
			 expect{
				click_button('Place Bet')
			 }.to change(BetSlip, :count).by(1)	
			 puts ('count after: '+ BetSlip.count.to_s)

			expect(page).to have_content 'Thank You! Bets have been placed.'
			new_balance = user.balance-stake
			user.update(balance:new_balance)
			expect(user.balance).to eq(new_balance)
			expect(page.current_path).to eq '/'

			Sidekiq::Testing.inline! do
				BetslipsWorker.drain
			end
        	expect {
                uri = URI(url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.read_timeout = 180
                request = Net::HTTP::Post.new(uri.request_uri)
                request.set_form_data('payload' => payload, 'routing_key' => routing_key)
                request['access-token'] = auth_token
                response = http.request(request)
                # puts response.body
                # puts response.code
            }.to change(Soccer::BetSettlementWorker.jobs, :size).by(1)
            sleep(3)
        end


        #Bet cancel
        it 'should successfully cancel bets for an event' do
        	fixture = fixture = Fixture.joins(:market1_pre).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).limit(1)[0]
	        	 
	        url = "http://localhost:3000/amqp/v1/sports/soccer"
	        payload = ""
	        routing_key = "hi.pre.-.bet_cancel.1.sr:match.#{fixture.event_id}.-"

	        login_form(user.phone_number, user.password)
			expect(page).to have_content('Upcoming Fixtures - Soccer')
			expect(page).to have_content('Betslip')
			first("#pre_3_#{fixture.id}").click
			stake = 1000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			puts ('count before: '+BetSlip.count.to_s)
			 expect{
				click_button('Place Bet')
			 }.to change(BetSlip, :count).by(1)	
			 puts ('count after: '+ BetSlip.count.to_s)

			expect(page).to have_content 'Thank You! Bets have been placed.'
			new_balance = user.balance-stake
			user.update(balance:new_balance)
			expect(user.balance).to eq(new_balance)
			expect(page.current_path).to eq '/'

			Sidekiq::Testing.inline! do
				BetslipsWorker.drain
			end

        	expect {
                uri = URI(url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.read_timeout = 180
                request = Net::HTTP::Post.new(uri.request_uri)
                request.set_form_data('payload' => payload, 'routing_key' => routing_key)
                request['access-token'] = auth_token
                response = http.request(request)
                # puts response.body
                # puts response.code
            }.to change(Soccer::BetCancelWorker.jobs, :size).by(1)
            sleep(3)
        end


        #Betstop
        it 'should successfully stop bets for an event' do
        	fixture = fixture = Fixture.joins(:market1_pre).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).limit(1)[0]
	        	 
	        url = "http://localhost:3000/amqp/v1/sports/soccer"
	        payload = ""
	        routing_key = "hi.pre.-.bet_stop.1.sr:match.#{fixture.event_id}.-"

	        login_form(user.phone_number, user.password)
			expect(page).to have_content('Upcoming Fixtures - Soccer')
			expect(page).to have_content('Betslip')
			first("#pre_2_#{fixture.id}").click
			stake = 1000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			puts ('count before: '+BetSlip.count.to_s)
			 expect{
				click_button('Place Bet')
			 }.to change(BetSlip, :count).by(1)	
			 puts ('count after: '+ BetSlip.count.to_s)

			expect(page).to have_content 'Thank You! Bets have been placed.'
			new_balance = user.balance-stake
			user.update(balance:new_balance)
			expect(user.balance).to eq(new_balance)
			expect(page.current_path).to eq '/'

			Sidekiq::Testing.inline! do
				BetslipsWorker.drain
			end

        	expect {
                uri = URI(url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.read_timeout = 180
                request = Net::HTTP::Post.new(uri.request_uri)
                request.set_form_data('payload' => payload, 'routing_key' => routing_key)
                request['access-token'] = auth_token
                response = http.request(request)
                # puts response.body
                # puts response.code
            }.to change(Soccer::BetStopWorker.jobs, :size).by(1)
            sleep(3)
        end


        #rollback settlement
        it 'should successfully rollback settlement for an event' do
        	fixture = fixture = Fixture.joins(:market1_pre).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).limit(1)[0]
	        
	        url = "http://localhost:3000/amqp/v1/sports/soccer"
	        payload = ""
	        routing_key = "hi.pre.-.rollback_settlement.1.sr:match.#{fixture.event_id}.-"

	         login_form(user.phone_number, user.password)
			expect(page).to have_content('Upcoming Fixtures - Soccer')
			expect(page).to have_content('Betslip')
			first("#pre_2_#{fixture.id}").click
			stake = 1000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			puts ('count before: '+BetSlip.count.to_s)
			 expect{
				click_button('Place Bet')
			 }.to change(BetSlip, :count).by(1)	
			 puts ('count after: '+ BetSlip.count.to_s)

			expect(page).to have_content 'Thank You! Bets have been placed.'
			new_balance = user.balance-stake
			user.update(balance:new_balance)
			expect(user.balance).to eq(new_balance)
			expect(page.current_path).to eq '/'

			Sidekiq::Testing.inline! do
				BetslipsWorker.drain
			end

        	expect {
                uri = URI(url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.read_timeout = 180
                request = Net::HTTP::Post.new(uri.request_uri)
                request.set_form_data('payload' => payload, 'routing_key' => routing_key)
                request['access-token'] = auth_token
                response = http.request(request)
                # puts response.body
                # puts response.code
            }.to change(Soccer::RollbackSettlementWorker.jobs, :size).by(1)
            sleep(3)
        end


        #rollback cancel
        it 'should successfully rollback betcancel for an event' do
        	fixture =      
	 
	        url = "http://localhost:3000/amqp/v1/sports/soccer"
	        payload = ""
	        routing_key = "hi.pre.-.rollback_cancel.1.sr:match.#{fixture.event_id}.-"
	        login_form(user.phone_number, user.password)
			expect(page).to have_content('Upcoming Fixtures - Soccer')
			expect(page).to have_content('Betslip')
			first("#pre_2_#{fixture.id}").click
			stake = 1000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			puts ('count before: '+BetSlip.count.to_s)
			 expect{
				click_button('Place Bet')
			 }.to change(BetSlip, :count).by(1)	
			 puts ('count after: '+ BetSlip.count.to_s)

			expect(page).to have_content 'Thank You! Bets have been placed.'
			new_balance = user.balance-stake
			user.update(balance:new_balance)
			expect(user.balance).to eq(new_balance)
			expect(page.current_path).to eq '/'

			Sidekiq::Testing.inline! do
				BetslipsWorker.drain
			end

        	expect {
                uri = URI(url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.read_timeout = 180
                request = Net::HTTP::Post.new(uri.request_uri)
                request.set_form_data('payload' => payload, 'routing_key' => routing_key)
                request['access-token'] = auth_token
                response = http.request(request)
                # puts response.body
                # puts response.code
            }.to change(Soccer::RollbackCancelWorker.jobs, :size).by(1)
            sleep(3)
        end


    end

end



