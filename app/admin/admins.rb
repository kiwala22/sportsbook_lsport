ActiveAdmin.register Admin do

  permit_params :email, :password, :password_confirmation, :first_name, :last_name, :role

    index do
    selectable_column
    id_column
    column :email
    column :first_name
    column :last_name
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    column :role
    actions
    end

    filter :email
    filter :role
    filter :current_sign_in_at
    filter :sign_in_count
    filter :created_at

    form do |f|
    f.inputs "Admin Details" do
        f.input :email
        f.input :first_name
        f.input :last_name
        f.input :password
        f.input :password_confirmation, label: 'Confirmation'
        f.input :role, as: :select, collection: (["manager", "service manager", "customer service"])
    end
    f.actions
    end
  
end
