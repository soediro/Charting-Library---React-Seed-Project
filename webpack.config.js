var path = require('path');

module.exports = {
	entry: {
		"chartIQ": "./src/app.jsx"
	},
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js"
  },
	module: {
		loaders: [{
			exclude: [/node_modules/, "/chartiq/"],
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
};
