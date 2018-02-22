const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const mime = require('mime');


module.exports = (config) => {

	const templatePath = config.path;
	const templateExtName = config.extname;
	const templateFileList = fs.readdirSync(templatePath);

	const tempaltePathObj = {};

	templateFileList.map((file) => {
		tempaltePathObj[file] = path.join(templatePath, file);
	});


	return async (ctx, next) => {

		ctx.render = async (file, data) => {
			let fileName = file + templateExtName;
			let filePath = tempaltePathObj[fileName] || '';

			let content = '';

			try {
				content = fs.readFileSync(filePath, {
					encode: 'utf8'
				}).toString();

				if(data) {
					content = ejs.render(content, data);
				}
			}
			catch(e) {
				content = ejs.render(file, data);
			}

			ctx.type = mime.getType('.html');
			ctx.state.body = content;

			return content;
		};

		await next();
	}
};
