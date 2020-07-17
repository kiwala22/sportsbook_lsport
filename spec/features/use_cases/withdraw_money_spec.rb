require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe User, type: :system, js: true do

	

	describe "login" do
		include_context 'Api_Generation'

		user = User.create({
					email: Faker::Internet.email,
					phone_number: '2567'+ rand(00000000..99999999).to_s,
					first_name: Faker::Name.first_name,
					last_name: Faker::Name.last_name,
					password: "Jtwitw@c2016",
					password_confirmation: "Jtwitw@c2016"
				})
		user.update(verified: true)

		random_amount = 10000*rand(1..10)

		def login_form(phone_number, password)
			fill_in 'phone_number', with: phone_number
			fill_in 'password', with: password
			click_button 'Log in'
		end


		it "should allow successful login and withdraw money froma user's account" do
			#generate_api_keys(api_user1.id)
			visit '/'
			click_link('login')
			login_form(user.phone_number, user.password)
			expect(page.current_path).to eq('/')
			expect(page).to have_content 'DEPOSIT'
			expect(page).to have_content user.first_name.upcase
			expect(page).to have_content user.balance
			visit '/transfer'	
			#expect(user.phone_number).to eq('Phone Number')
			fill_in 'amount', with: random_amount
			 expect{
			 	click_button 'Withdraw Money'
			 }.to change(WithdrawsWorker.jobs, :size).by(1)
			expect(page).to have_content "Please wait while we process your payment.."
			sleep(4)
		end

		it 'login should fail on low account balance' do
			visit '/'
			click_link('login')
			login_form(user.phone_number, user.password)
			expect(page.current_path).to eq('/')
			expect(page).to have_content 'DEPOSIT'
			expect(page).to have_content user.first_name.upcase
			expect(page).to have_content user.balance
			visit '/transfer'	
			#expect(user.phone_number).to eq('Phone Number')
			fill_in 'amount', with: random_amount
			 expect{
			 	click_button 'Withdraw Money'
			 }.to change(WithdrawsWorker.jobs, :size).by(0)
			expect(page).to have_content "You have insufficient funds on your account."
		 end
	end
end

