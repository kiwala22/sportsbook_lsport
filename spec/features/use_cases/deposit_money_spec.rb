require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe User, type: :system, js: true do

	

	describe "login" do
		include_context 'Deposit_Api_Generation'

		user = User.create({
					email: Faker::Internet.email,
					phone_number: '25677'+ rand(0000000..9999999).to_s,
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


		it 'should login successfully and deposit money to his account' do
			#generate_api_keys(api_user1.id)
			visit '/'
			click_link('login')
			login_form(user.phone_number, user.password)
			expect(page.current_path).to eq('/')
			expect(page).to have_content 'DEPOSIT'
			expect(page).to have_content user.first_name.upcase
			expect(page).to have_content user.balance
			click_link 'Deposit'		
			fill_in 'phone_number', with: user.phone_number
			fill_in 'amount', with: random_amount
			expect{
				click_button 'Deposit Money'
			}.to change(DepositsWorker.jobs, :size).by(1)
			expect(page).to have_content "Please wait while we process your transaction.."
			Sidekiq::Testing.inline! do
				DepositsWorker.drain
			end
			sleep(2)
			expect(Deposit.last.status).to eq('SUCCESS')
			expect(Transaction.last.status).to eq('COMPLETED')
			end

		it 'login should fail on wrong incomplete phone number' do
			#generate_api_keys(api_user1.id)
			visit '/'
			click_link('login')
			login_form(user.phone_number, user.password)
			expect(page.current_path).to eq('/')
			expect(page).to have_content 'DEPOSIT'
			expect(page).to have_content user.first_name.upcase
			expect(page).to have_content user.balance
			click_link 'Deposit'		
			fill_in 'phone_number', with: '0783467552'
			fill_in 'amount', with: random_amount
			click_button 'Deposit Money'
			
			expect(page).not_to have_content "Please wait while we process your transaction.."
			expect(page).to have_content "Phone number number should be 12 digits long."
			sleep(4)
			
		end
	end
end

