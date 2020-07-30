require 'rails_helper'

RSpec.describe User, type: :system, js: true do
	describe 'Place bet' do

		odd1 = 2.5
		odd2 = 1.9

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

		def choose_odds(odd1, odd2)
			
		end


		it 'should be successful when a user is logged in' do
			login_form(user.phone_number, user.password)
			expect(page).to have_content('Pre-Match Fixtures - Soccer')
			expect(page).to have_content('Betsb slip')

			first('#odd1').click
			all('a', :id => 'odd1')[1].click
			all('a', :id => 'odd2')[2].click
			all('a', :id => 'odd3')[3].click
			# all('a', :id => 'odd2')[5].click
			all('a', :id => 'odd1')[4].click
			stake = 2000
			fill_in 'stake', with: stake
			expect(stake).to be <= user.balance
			expect(stake).to be > 0
			
			
			sleep(2)

		end

		it 'should fail on low balance' do
			login_form(user.phone_number, user.password)
			expect(page).to have_content('Pre-Match Fixtures - Soccer')
			expect(page).to have_content('Betsb slip')

			first('#odd1').click
			all('a', :id => 'odd1')[1].click
			all('a', :id => 'odd2')[2].click
			all('a', :id => 'odd3')[3].click
			# all('a', :id => 'odd2')[5].click
			all('a', :id => 'odd1')[4].click
			stake = 10000
			fill_in 'stake', with: stake
			click_button('Place Bet')
			expect(page).to have_content'You have insufficient balance on your account. Please deposit some money.'			
			
			sleep(2)

		end
		
		it 'should prompt login on no login session' do
			visit '/'
			expect(page).to have_content('Pre-Match Fixtures - Soccer')
			expect(page).to have_content('Betsb slip')

			first('#odd1').click
			all('a', :id => 'odd1')[1].click
			all('a', :id => 'odd2')[2].click
			all('a', :id => 'odd3')[3].click
			# all('a', :id => 'odd2')[5].click
			all('a', :id => 'odd1')[4].click
			stake = 1000
			fill_in 'stake', with: stake
			sleep(1)
			
			expect(page).to_not have_content 'Place bet'
			click_button('Login')
			sleep (2)
		end

	end
end