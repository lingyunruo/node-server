const path = require('path');


module.exports = {

	template: {
		path: path.join(__dirname, '../template'),
		extname: '.html'
	},
	router: {
		routes: {
			'/': 'index'
		},
		controller: {
			path: path.join(__dirname, '../controller')
		},
	},
	static: {
		basePath: path.join(__dirname, '../static'),
		extname: ['.js', '.css']
	}
};
