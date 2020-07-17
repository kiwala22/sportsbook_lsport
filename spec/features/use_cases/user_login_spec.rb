require 'rails_helper'

RSpec.describe User, type: :system, js: true do

	describe "login" do
		#include_context 'Registrations'
		user = User.create({
					email: Faker::Internet.email,
					phone_number: '2567'+ rand(00000000..99999999).to_s,
					first_name: Faker::Name.first_name,
					last_name: Faker::Name.last_name,
					password: "Jtwitw@c2016",
					password_confirmation: "Jtwitw@c2016"
				})
		user.update(verified: true)

		def login_form(phone_number, password)
			fill_in 'phone_number', with: phone_number
			fill_in 'password', with: password
			click_button 'Log in'
		end


		it 'should login successfully with correct params and signout' do
			visit '/'
			click_link('login')
			login_form(user.phone_number, user.password)
			expect(page.current_path).to eq('/')
			expect(page).to have_content 'DEPOSIT'
			expect(page).to have_content user.first_name.upcase
			expect(page).to have_content user.balance
			sleep(3)
			visit '/users/sign_out'
			expect(page.current_path).to eq '/'
			expect(page).to have_content 'SIGNUP'
			expect(page).to have_content 'LOGIN'
		end

		it 'should fail to login when invalid credentials are filled in' do
			visit '/'
			click_link('login')
			login_form(user.phone_number, 'Omwana_weeka@900')
			expect(page.current_path).to eq '/users/sign_in'
		end

		it 'should fail to login when email is fed instead of phone_number' do
			visit '/'
			click_link('login')
			login_form(user.email, user.password)
			expect(page.current_path).to eq '/users/sign_in'
		end

	end
end