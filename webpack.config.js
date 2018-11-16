const path = require("path");
const Copy = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "build")
	},
	plugins: [
		new Copy([{ from: path.resolve(__dirname, "static") }])
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"]
					}
				}
			}
		]
	}
};

