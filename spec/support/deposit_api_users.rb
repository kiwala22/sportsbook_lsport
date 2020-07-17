require 'faker'

RSpec.shared_context 'Deposit_Api_Generation' do

	before :each do
		api_generation
	end



	def api_generation
		# @api_user1 = ApiUser.create({
		# 	first_name: Faker::Name.first_name,
		# 	last_name: Faker::Name.last_name,
		# 	api_id:  SecureRandom.uuid,
		# 	user_type: 'transfer'
		# 	})

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

		# fill_in 'First Name', with: @api_user1.first_name
		# fill_in 'Last Name', with: @api_user1.last_name
		# page.select 'Collections', from: 'Action'

		# click_button 'Submit'

		expect(page.current_path).to eq('/backend/api_users')
		first('#api_key').click
		
		#expect(page).not_to have_content 'Generate API key'
		sleep(2)
		visit 'admins/sign_out'
		#rerouting to create a user with another action type
		# visit 'admins/sign_in'
		# fill_in 'Email', with: @admin_user.email
		# fill_in 'Password', with: @admin_user.password
		# click_button 'Login'

		# #page.find(:xpath, "//a[@href='backend/api_users/new']").click
		# click_link 'Developers'
		# click_link 'Create API Users'
		# fill_in 'First Name', with: @api_user2.first_name
		# fill_in 'Last Name', with: @api_user2.last_name
		# page.select 'Disbursements', from: 'Action'

		# click_button 'Submit'

		# expect(page.current_path).to eq('/backend/api_users')
		# click_link 'Generate API Key'
		# #expect(page.current_path).to eq('/backend/api_users')
		# expect(page).not_to have_content 'Generate API key'
		# sleep(2)

	end


		
end
