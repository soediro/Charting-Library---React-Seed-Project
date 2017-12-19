var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		"chartIQ": "./src/index.js"
	},
	output: {
		publicPath:'/dist/',
		path: path.resolve(__dirname, './dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			exclude: [/node_modules/, "/chartiq/"],
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-2']
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
			}
		})
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
