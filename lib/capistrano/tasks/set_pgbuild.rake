namespace :bundler do
   before 'bundler:install', :config
     desc 'bundle config options'
     task :config do
       on roles(:all), in: :groups, limit: 3, wait: 10 do
       # Required for pg gem to be installed
       execute 'bundle config build.pg --with-pg-config=/bin/pg_config'
     end
   end
 end