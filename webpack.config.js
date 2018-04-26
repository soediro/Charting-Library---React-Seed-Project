var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
		filename: "[name].[contenthash].css",
		disable: process.env.NODE_ENV === "development"
});

module.exports = {
		devtool: 'source-map',
		entry: [
				"babel-polyfill", "./src/index.js"
		],
		output: {
				publicPath: '/dist/',
				path: path.resolve(__dirname, './dist'),
				filename: "[name].js"
		},
		module: {
				rules: [
						{
								test: /\.(js|jsx)$/,
								exclude: [
										/node_modules/, /ChartIQ/
								],
								use: ['babel-loader']
						}, {
								test: /\.(s*)css$/,
								use: extractSass.extract({
										use: [
												{
														loader: "css-loader"
												},
												{
														loader: "sass-loader"
												}
										],
										// use style-loader in development
										fallback: "style-loader"
								})
						}
				]
		},
		externals: {
				// Use external version of React "react": "React", "react-dom": "ReactDOM"
		},
		plugins: [
				//new webpack.IgnorePlugin(/react/),
				new webpack.DefinePlugin({
						"process.env": {
								NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
						}
				}),
				new ExtractTextPlugin({filename: 'app.bundle.css'})
		],
		devServer: {
				port: 3000,
				compress: true,
				inline: true,
				stats: 'minimal'
		},
		resolve: {
				extensions: ['.js', '.jsx']
		}
};
