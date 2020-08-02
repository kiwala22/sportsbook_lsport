require 'rails_helper'

RSpec.describe User, type: :system, js: true do


	describe "password reset" do

		user = User.create({
					email: Faker::Internet.email,
					phone_number: '25677'+ rand(1000000..9999999).to_s,
					first_name: Faker::Name.first_name,
					last_name: Faker::Name.last_name,
					password: "Jtwitw@c2016",
					password_confirmation: "Jtwitw@c2016"
				})
		user.update(verified: true)


		# it 'should succeed' do
		# 	visit '/'
		# 	click_link('login')
		# 	click_link('Forgot your password?')
		# 	fill_in 'Phone Number', with: user.phone_number
		# 	click_button 'Send Reset Code'
		# 	# reset_pin = User.last.password_reset_code
		# 	fill_in 'Reset Code', with: User.last.password_reset_code
		# 	click_button 'Verify Code'
		# 	fill_in'password_reset', with:user.password
		# 	fill_in'password_confirmation_reset', with: user.password_confirmation
		# 	# sleep(1)
		# 	click_button 'Change my password'
		# 	expect(page).to have_content('Your password has been changed successfully. You are now signed in.')
		#   #expect(page).to have_content(user.first_name.upcase)
		# end

		# it 'should fail to reset the password on invalid input' do
		# 	visit '/'
		# 	click_link('login')
		# 	click_link('Forgot your password?')
		# 	fill_in 'Phone Number', with: user.phone_number
		# 	click_button 'Send Reset Code'	
		# 	# reset_pin = User.last.password_reset_code
		# 	fill_in 'Reset Code', with: User.last.password_reset_code
		# 	click_button 'Verify Code'
		# 	fill_in'password_reset', with: 'Tugende'
		# 	fill_in'password_confirmation_reset', with: 'Tugende'
		# 	# sleep(1)
		# 	click_button 'Change my password'
		# 	expect(page).to have_content 'Password Complexity requirement not met. Length should be 8-70 characters and include: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
		# end

	end
end
