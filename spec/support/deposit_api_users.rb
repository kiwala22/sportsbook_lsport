require 'faker'

RSpec.shared_context 'Deposit_Api_Generation' do

	before :each do
		api_generation
	end

	def api_generation

		@api_user = ApiUser.create({
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			api_id:  SecureRandom.uuid,
			user_type: 'collections'
			})

		@admin_user = Admin.new(
			first_name:Faker::Name.first_name,
			last_name:Faker::Name.last_name,
			email:Faker::Internet.email,
			password:'Mutumba#30',
			password_confirmation:'Mutumba#30'
		)
		@admin_user.save!

		visit '/admins/sign_in'
		fill_in 'Email', with: @admin_user.email
		fill_in 'Password', with: @admin_user.password
		click_button 'Login'
		click_link 'Developers'
		click_link 'API Users'

		expect(page.current_path).to eq('/backend/api_users')
		
		first('#api_key').click
		
		sleep(1)
		visit '/admins/sign_out'

	end
		
end
