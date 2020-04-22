# lib/capistrano/tasks/my_assets.rake

# invoke local task:
#   invoke 'deploy:my_assets:local_precompile'
# invoke external task (with rbenv_prefix):
#   execute :rake, 'assets:clean'
# invoke external task (without rbenv_prefix):
#   execute 'bundle exec rake assets:clean'
namespace :deploy do
  namespace :my_assets do
    desc 'Precompile assets locally'
    task :local_precompile do
      run_locally do
        with rails_env: fetch(:stage) do
          # run yarn manually since webpacker:yarn_install runs yarn
          # with `--production` flag which doesn't install development
          # dependencies while they are required for asset compilation
          #
          # yarn cache is saved to this folder on CI server
          execute 'yarn install --cache-folder ~/.cache/yarn'

          # don't run rake with rbenv_prefix - rbenv is not installed
          # on CI server and it's necessary to symlink its executable
          # to ~/.rbenv/bin/rbenv on macOS locally
          #
          # run webpacker:compile instead of assets:precompile
          # to skip webpacker:yarn_install task at all:
          #
          # Rake::Task.define_task(
          #   "assets:precompile" => [
          #     "webpacker:yarn_install",
          #     "webpacker:compile"
          #   ]
          # )
          execute 'bundle exec rake webpacker:compile'
        end
      end
    end

    desc 'Copy precompiled assets to remote server'
    task :rsync do
      on release_roles(:app) do |server|
        local_path = "#{fetch(:packs_dir)}/"
        remote_path = "#{server.user}@#{server.hostname}:#{release_path}/#{fetch(:packs_dir)}/"

        run_locally do
          execute "#{fetch(:rsync_cmd)} #{local_path} #{remote_path}"
        end
      end
    end

    desc 'Remove all precompiled assets locally'
    task :local_cleanup do
      run_locally do
        with rails_env: fetch(:stage) do
          # public/packs is not a symlink any more - each
          # release has its own public/packs/ directory
          execute "rm -rf #{fetch(:packs_dir)}"
        end
      end
    end
  end
end

# namespace :load do
#   task :defaults do
#     set :packs_dir, 'public/packs'
#     set :rsync_cmd, 'rsync -av --delete'
#
#     after 'bundler:install', 'deploy:my_assets:local_precompile'
#     after 'bundler:install', 'deploy:my_assets:rsync'
#     after 'bundler:install', 'deploy:my_assets:local_cleanup'
#   end
# end
