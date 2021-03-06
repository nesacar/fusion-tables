var path = require('path');

var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

/*var extractPlugin = new ExtractTextPlugin("[name].bundle.css", {
    //filename: 'main.css'
});*/
var extractPlugin = new ExtractTextPlugin('style.css');

module.exports = {
    entry: {
        app: './src/js/app.js',
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [
                        'css-loader',
                        'autoprefixer-loader?safe=true',
                        {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'sass-loader'
                    ],
                })
            },
            /*{
                test: /\.html$/,
                use: ['html-loader']
            },*/
            {
                test: /\.(jpg|png|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            //publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new UglifyJsPlugin({
            //...
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'collections.html',
            template: 'src/collections.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'product.html',
            template: 'src/product.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'about-us.html',
            template: 'src/about-us.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            template: 'src/contact.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'quality.html',
            template: 'src/quality.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'design.html',
            template: 'src/design.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'gallery.html',
            template: 'src/gallery.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'testimonials.html',
            template: 'src/testimonials.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'press.html',
            template: 'src/press.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'archi-club.html',
            template: 'src/archi-club.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'katalog.html',
            template: 'src/katalog.html'
        }),
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            chunks: ['app', 'about']
        }),*/
        new CleanWebpackPlugin('dist')
    ]
};
