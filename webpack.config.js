const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'bundle.js',
    }, 
    mode: 'development',
    plugins: [
        new CheckerPlugin()
    ],
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        disableHostCheck: true,
        hot: true,
    }
};
