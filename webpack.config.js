const path = require('path');
const webpack = require('webpack');

module.exports = [{
	entry : {
		app : './public/js/src/main.js',
		vendor : ["jquery", "underscore"],
	},
	output : {
		path : path.resolve(__dirname, 'public', 'js', 'dist'),
		filename : 'bundle.js'
	},
	module : {
		rules : [
			{
				test : /\.css$/,
				use : [
					'style-loader',
					'css-loader'
				]
			},
			{
				test : /\.js$/,
				include : /(src)/,
				use : [
					'babel-loader'
				]
			}
		]
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin({name : 'vendor', filename : 'vendor.bundle.js'})
	]

}];