// todas las configuraciones del proyecto
module.exports = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8080,
	ip: process.env.IP || '0.0.0.0',
	cors: process.env.CORS || true,
	TOKEN_SECRET: process.env.TOKEN_SECRET || "dG9rZW51bHRyYXNlY3JldG8=",
	mongo: {
		url: process.env.MONGODB_URI || 'mongodb://127.0.0.1/dev',
		options: {
			useMongoClient: true
		}
	}
};