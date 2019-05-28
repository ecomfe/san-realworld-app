const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        port: 8888,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    plugins: [
        new HTMLWebpackPlugin({template: 'src/index.html'}),
    ],
};
