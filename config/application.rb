require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SkylineSportsbook
  require 'devise/orm/active_record'
   class Application < Rails::Application
      # Initialize configuration defaults for originally generated Rails version.
      config.load_defaults 5.2
      config.generators do |f|
         f.test_framework :rspec
      end
      config.eager_load_paths << Rails.root.join('lib')
      config.filter_parameters << :password
      # Settings in config/environments/* take precedence over those specified here.
      # Application configuration can go into files in config/initializers
      # -- all .rb files in that directory are automatically loaded after loading
      # the framework and any gems in your application.

      Raven.configure do |config|
        config.dsn = 'https://7325d4d785aa4c4680e827281642e19c:7461f63c60fa4098bd062b5034892f55@o371083.ingest.sentry.io/5211327'
      end
   end
end
