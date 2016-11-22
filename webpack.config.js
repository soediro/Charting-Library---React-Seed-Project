module.exports = {
	entry: {
		"chartIQ": "./src/app.jsx"
	},
	output: {
		path: ("./dist"),
		filename: "[name].js",
		watch: true
	},
	module: {
		loaders: [{
			exclude: [/node_modules/, "/chartiq/"],
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
};