require 'rails_helper'


RSpec.describe User, type: :system, js: true do
	describe 'Place bet' do

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
			click_button 'Log in'
		end


		it 'should be successful when a user is logged in' do
			login_form(user.phone_number, user.password)
			expect(page).to have_content('Pre-Match Fixtures - Soccer')
			expect(page).to have_content('Betslip')
			first('#odd1').click
			all('a', :id => 'odd1')[1].click
			all('a', :id => 'odd2')[2].click
			all('a', :id => 'odd3')[3].click
			# all('a', :id => 'odd2')[5].click
			# all('a', :id => 'odd1')[4].click
			stake = 2000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			click_button('Place Bet')	
			expect(page).to have_content 'Thank You! Bets have been placed.'
			new_balance = user.balance-stake
			user.update(balance:new_balance)
			expect(user.balance).to eq(new_balance)
			expect(page.current_path).to eq '/'				

		end

		it 'should fail on low balance' do
			login_form(user.phone_number, user.password)
			expect(page).to have_content('Pre-Match Fixtures - Soccer')
			expect(page).to have_content('Betslip')

			first('#odd1').click
			all('a', :id => 'odd1')[1].click
			# all('a', :id => 'odd2')[2].click
			# all('a', :id => 'odd3')[3].click
			# all('a', :id => 'odd2')[5].click
			# all('a', :id => 'odd1')[4].click
			stake = 20000
			fill_in 'stake', with: stake
			# expect('total-odds').to eq()
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			click_button('Place Bet')				
			expect(page).to have_content'You have insufficient balance on your account. Please deposit some money.'	
		end

		
		it 'User can login after choosing games' do
			visit '/'
			expect(page).to have_content('Pre-Match Fixtures - Soccer')
			expect(page).to have_content('Betslip')

			first('#odd1').click
			all('a', :id => 'odd1')[1].click
			# all('a', :id => 'odd2')[2].click
			# all('a', :id => 'odd3')[3].click
			# all('a', :id => 'odd2')[5].click
			# all('a', :id => 'odd1')[4].click
			stake = 2000
			fill_in 'stake', with: stake
			expect('total-wins'.to_f).to eq('total-odds'.to_f * 'stake-input'.to_i)
			sleep(1)		
			expect(page).to_not have_content 'Place bet'
			click_button('Login')
			sleep (1)
		end

	end
end