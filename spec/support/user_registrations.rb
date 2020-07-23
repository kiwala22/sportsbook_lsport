require 'faker'

RSpec.shared_context 'Registrations' do

	before :each do
		registration
	end

	let(:valid_params) do {
			email: Faker::Internet.email,
			phone_number: '2567'+ rand(00000000..99999999).to_s,
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			password: Faker::Internet.password(min_length: 8, mix_case: true, special_characters: true)
		}
	end

	def registration
		visit '/'
		click_link('signup')

		fill_in 'Email', with: valid_params[:email]
		fill_in 'Phone number', with:valid_params[:phone_number]
		fill_in 'First name', with: valid_params[:first_name]
		fill_in 'Last name', with: valid_params[:last_name]
		fill_in 'Password', with: valid_params[:password]
		fill_in 'Password confirmation', with: valid_params[:password]
		click_button 'Sign up'

		passcode = User.last.pin
		
		fill_in 'Pin', with: passcode
		click_button 'Verify'
		
		visit '/users/sign_out'
	end


end	