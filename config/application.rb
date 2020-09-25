require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SkylineSportsbook
   class Application < Rails::Application
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

      config.log_level = :info
      config.logger = ActiveSupport::TaggedLogging.new(ActiveSupport::Logger.new(STDOUT))
   end
end
