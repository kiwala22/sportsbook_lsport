# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "SkylineBet"
set :repo_url, "git@bitbucket.org:skylinesmslimited/sportsbook_lsport.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :scm is :git
# set :scm, :git

set :ssh_options, {:forward_agent => true, port: 22}

set :deploy_via, :copy

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

# Default value for :pty is false
set :pty, true

set :passenger_restart_with_touch, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml', '.env', 'config/initializers/sidekiq.rb')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/reports', 'node_modules')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

set :assets_prefix, 'packs'

set :copy_files, %w[node_modules]

#set :rbenv_custom_path, "root/.rbenv/shims/ruby"
set :rbenv_type, :user # or :system, depends on your rbenv setup
#set :rbenv_ruby, '2.7.0'

# in case you want to set ruby version from the file:
# set :rbenv_ruby, File.read('.ruby-version').strip
#set :rbenv_path, '~/.rbenv/shims/ruby'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all # default value



namespace :deploy do

 after :restart, :clear_cache do
   on roles(:web), in: :groups, limit: 3, wait: 10 do
     # Here we can do anything such as:
     # within release_path do
     #   execute :rake, 'cache:clear'
     # end
   end
 end

end
