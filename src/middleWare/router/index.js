const path = require('path');
const fs = require('fs');


module.exports = (config) => {

	let controllerPath = config.controller.path;
	let routeMap = config.routes;

	let controllList = [];
	let routerObj = {};

	let reversRouteMap = {};

	Object.keys(routeMap).map((key) => {
		reversRouteMap[routeMap[key]] = key;
	});

	try {
		controllList = fs.readdirSync(controllerPath);

		controllList.map((file) => {
			let fileName = path.basename(file, '.js');
			let url = reversRouteMap[fileName];

			routerObj[url] = path.join(controllerPath, routeMap[url]);
		});
	}
	catch(e) {
		console.log(e);
	}

	return async (ctx, next) => {
		let url = ctx.url;

		let controlPath = routerObj[url];

		if(controlPath) {
			let control = require(controlPath);

			control(ctx);
		}

		await next();
	}
}
