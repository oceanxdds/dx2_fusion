const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    entry:'./src/js/index.js',
    output:{
        path: path.resolve(__dirname, 'public/js'),
        filename:'[name].js'
    },
    mode :'production',
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // 'vue-style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            url: false
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            url: false
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins: function(){
                                    require('autoprefixer')
                                }
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                },
                data:{
                    test:/[\\/]data[\\/]/,
                    name:"data",
                    chunks:"all"
                }
            }
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:'../css/bundle.css'
        }),
        // new WebpackBundleAnalyzer()
    ]
}