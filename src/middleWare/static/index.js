const path = require('path');
const fs = require('fs');
const mime = require('mime');


module.exports = (config) => {

	let staticPath = config.basePath;
	let cacheObj = {};

	return async (ctx, next) => {

		let url = ctx.url;
		let extName = path.extname(url);
		ctx.status = 200;

		if(config.extname.indexOf(extName) >= 0) {
			ctx.type = mime.getType(extName);

			try {
				let result = '';
				if(cacheObj[url] && false) {
					result = cacheObj[url];
				}
				else {
					result = fs.readFileSync(path.join(staticPath, url), {
						encode: 'utf8'
					}).toString();

					cacheObj[url] = result;
				}

				ctx.state.body = result;
			}
			catch(e) {
				console.log(e);
				ctx.status = 404;
				ctx.state.body = 'Not Found';
			}
		}

		await next();
	}
}
