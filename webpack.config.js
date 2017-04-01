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
    filename: '[name].[chunkhash].js' // uses key 'name' from above. 'chunkhash' adds random number to help with end users browser cache.
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
  		names: ['vendor', 'manifest'] // any of the output that is a duplicate, add it ONLY to vendor output. manifest let's the browser know exactly what has changed. The hash (above) doesn't always get picked up otherwise.
  	}),
  	new HtmlWebpackPlugin({
  		// builds a default by itself or you can feed it a template like so:
  		template: 'src/index.html'
  	}),
    new webpack.DefinePlugin({ // defines window scope variables that are used in JS output files. variable left, value right. JSON.stringify just makes sure it's JSON friendly
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // webpack looks fro process.env.NODE_ENV on window scope. In production you can have error checks but live can be ignored for faster speed. Note that process.env.NODE_ENV can be set as a variable (for the right handside only.)
    })
  ]
};