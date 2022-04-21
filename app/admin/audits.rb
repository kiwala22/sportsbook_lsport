ActiveAdmin.register Audit do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :auditable_id, :auditable_type, :associated_id, :associated_type, :user_id, :user_type, :username, :action, :audited_changes, :version, :comment, :remote_address, :request_uuid
  #
  # or
  #
  # permit_params do
  #   permitted = [:auditable_id, :auditable_type, :associated_id, :associated_type, :user_id, :user_type, :username, :action, :audited_changes, :version, :comment, :remote_address, :request_uuid]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
