const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
environment.plugins.prepend('Provide',
    new webpack.ProvidePlugin({
        Rails: ['@rails/ujs'],
        $: 'jquery/src/jquery',
        jQuery: 'jquery/src/jquery',
        Popper: ['popper.js', 'default'],
        moment: "moment/moment"
    })
);

const config = environment.toWebpackConfig();
config.resolve.alias = {
 jquery: 'jquery/src/jquery'
};
module.exports = environment
