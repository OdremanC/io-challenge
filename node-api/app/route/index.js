//libreria para crear y leer directorios
const fs = require('fs');
//recorre todo el directorio routes y pasa el server como parametro
module.exports = (server) => {
	fs.readdirSync(__dirname).forEach((folder) => {
		if (fs.lstatSync(`${__dirname}/${folder}`).isDirectory()) {
			require(`./${folder}`)(server);
		}
	});
};