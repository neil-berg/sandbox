const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: path.join(__dirname, '/src/index.js'),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '*.jsx']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html')
		})
	],
	output: {
		path: path.join(__dirname, '/build'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'build')
	},
	devtool: 'source-map'
}