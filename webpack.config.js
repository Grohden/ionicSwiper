const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            // Load js
            {
                test: /\.js?$/,
                // exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    plugins: ['angularjs-annotate']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?url=false', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?url=false'
                })
            },
        ],
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 200
    },
    entry: {
        './dist/swiper': './src/swiper.module.js',
        './demo/demo': './src/demo/app.module.js'
    },
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: './demo',
        // hot:true
    },
    output: {
        path: __dirname,
        filename: '[name].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: getPath => getPath('[name].css').replace('css/js', 'css'),
            allChunks: true
        })
    ]
};