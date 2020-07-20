require 'rails_helper'
require 'faker'

RSpec.describe User, type: :system, js: true do
	user = User.new(
				email: Faker::Internet.email,
				phone_number: "256786481312",
				first_name:'Ivo',
				last_name:'Muts',
				password:'Tugende@12',
				password_confirmation:'Tugende@12')

	user_false = User.new(
			email:'mutsivan@exam1.com' ,
			phone_number:"0786481312",
			first_name:'Ivo',
			last_name:'Muts',
			password:'Tugende',
			password_confirmation:'Tugende'
		)

		# let(:valid_user_params) do
		# 		{
		# 				first_name: Faker::Name.name,
		# 				last_name: Faker::Name.name,
		# 				email: Faker::Internet.email,
		# 				phone_number: "256786481312",
		# 				password: "Jtwitw@c2016",
		# 				password_confirmation: "Jtwitw@c2016"
		# 		}
		# end




	describe 'sign up' do
		#we expect the signup to be a success with valid params
		it 'is valid with all attributes entered correctly' do
			expect(user).to be_valid
		end
		#we expect the signup to be a failure with invalid params
		it 'is invalid with wrong attributes' do
			expect(user_false).not_to be_valid
		end
		##user visits home page
		it 'should successfully visit home page' do
			visit root_path
			expect(page).to have_content('SIGNUP')
			expect(page).to have_content('LOGIN')
		end


		##user clicks on sign up button and fills form
		it 'should allow a user to create a Betsb account after clicking signup and accept otp' do
			visit '/'
			click_link('signup')

			expect(page.current_path).to eq('/users/sign_up')
			expect(page).to have_content('Signup')
			expect(page).to have_content('Email')
			expect(page).to have_content('Phone number')
			expect(page).to have_content('First name')
			fill_in 'Email', with: user.email #valid_user_params[:email]
			fill_in 'Phone number', with: user.phone_number #valid_user_params[:phone_number]
			fill_in 'First name', with: user.first_name #valid_user_params[:first_name]
			fill_in 'Last name', with: user.last_name #valid_user_params[:last_name]
			fill_in 'Password', with: user.password #valid_user_params[:password]
			fill_in 'Password confirmation', with: user.password_confirmation #valid_user_params[:password_confirmation]
			click_button 'Sign up'

			sleep(3)

			expect(page.current_path).to eq '/new_verify'
			passcode = User.last.pin
			fill_in 'pin', with: passcode
			click_button 'Verify'
			expect(page.current_path).to eq '/'
			expect(page).to have_content 'deposit'.upcase
			expect(page).to have_content User.last.first_name.upcase
						#sleep(2)
		end

		##We expect clicking sign up to bring up path /verify
		it 'should fail on any invalid parameter' do
			visit '/'

			click_link('signup')
			visit 'users/sign_up'
			expect(page).to have_content('Signup')
			expect(page).to have_content('Email')
			expect(page).to have_content('Phone number')
			expect(page).to have_content('First name')
			fill_in 'Email', with: user.email #valid_user_params[:email]
			fill_in 'Phone number', with: user.phone_number #valid_user_params[:phone_number]
			fill_in 'First name', with: user.first_name #valid_user_params[:first_name]
			fill_in 'Last name', with: user.last_name #valid_user_params[:last_name]
			fill_in 'Password', with: user.password #valid_user_params[:password]
			fill_in 'Password confirmation', with: 'juMong&209'
			click_button 'Sign up'

			sleep(3)

			expect(page).to have_content("doesn't match Password")
			expect(page.current_path).to eq('/users')
		end

	end
end
