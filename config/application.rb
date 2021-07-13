require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SkylineSportsbook
   class Application < Rails::Application
      config.filter_parameters << :password
      # Initialize configuration defaults for originally generated Rails version.
      config.load_defaults 5.2
      config.generators do |f|
         f.test_framework :rspec
      end
      config.eager_load_paths << Rails.root.join('lib')
      # Settings in config/environments/* take precedence over those specified here.
      # Application configuration can go into files in config/initializers
      # -- all .rb files in that directory are automatically loaded after loading
      # the framework and any gems in your application.
      
      config.time_zone = 'UTC'
      config.active_record.default_timezone = :local
      
      #add fonts to assets path
      config.assets.paths << Rails.root.join("app", "assets", "fonts")
      # fonts
      config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
      # images
      config.assets.precompile << /\.(?:png|jpg)$/

      Raven.configure do |config|
         config.dsn = 'https://f6e8c09401164a2ea35b20a06d2c1810@o371083.ingest.sentry.io/5220017'
      end

      # config.log_level = :info # commented out 03/10/20 - Acacia
      # config.logger = ActiveSupport::TaggedLogging.new(ActiveSupport::Logger.new(STDOUT))

      #add rack deflater Acacia - 13/07/2021
      config.middleware.insert_after ActionDispatch::Static, Rack::Deflater
   end
end
