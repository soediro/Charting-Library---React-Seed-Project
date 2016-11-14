module.exports = {
	entry: "./src/app.jsx",
	output: {
		path: __dirname,
		filename: "ReactChartIQ.js"
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
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