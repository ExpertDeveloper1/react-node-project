var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },
    entry: {
        app: ['./public/javascripts/src/main.js']
    },
    resolve: {
        alias: {}
    },
    //plugins: [
    //    new webpack.optimize.CommonsChunkPlugin('common.js')
    //],
    output: {
        path: './public/javascripts/build',
        filename: '[name].bundle.js'
    },
    module: {
        noParse: [],
        loaders: [{
            test: /\.js$/,
            loader: 'jsx-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(woff|png)$/,
            loader: 'url-loader?limit=100000'
        },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    }
};
config.addVendor('react', bower_dir + '/react/react.js');
config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
module.exports = config;
