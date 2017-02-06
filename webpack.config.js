module.exports = {
	entry: {
		"chartIQ": "./src/app.jsx"
	},
	output: {
		path: ("./dist"),
		filename: "[name].js",
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