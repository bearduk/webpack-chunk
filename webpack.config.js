var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
	'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
  	bundle: './src/index.js',
  	vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
  	rules: [
	  	{
	  		use: 'babel-loader',
	  		test: /\.js$/,
	  		exclude: /node_modules/
	  	},
	  	{
	  		use: ['style-loader', 'css-loader'],
	  		test: /\.css$/
	  	}
  	]
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin({
  		name: 'vendor' // any of the output that is a duplicate, add it ONLY to vendor output.
  	}),
  	new HtmlWebpackPlugin({
  		// builds a default by itself or you can feed it a template like so:
  		template: 'src/index.html'
  	})
  ]
};