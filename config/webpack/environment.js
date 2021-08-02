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

const less_loader = {
    rules: [{
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
         options: {
           lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
             modifyVars: {
               'primary-color': 'red',
               'link-color': '#1DA57A',
               'border-radius-base': '10px',
             },
             javascriptEnabled: true,
           },
         },
        }],
    }]
};
environment.loaders.append('less', less_loader)

module.exports = environment
