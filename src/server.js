import * as url from 'url'
import Fastify from 'fastify'
import Handlebars from 'handlebars'
import mjml2html from 'mjml'
import { logger } from './includes/logger.js'

function appRoot(){
	if(typeof appRoot.value == "undefined"){
		appRoot.value = url
			.fileURLToPath(new URL('../..', import.meta.url))
			.replace(/\/+$/, '') // Remove trailing slash(es)
	}

	return appRoot.value
}

// Parse MJML and return result
function parseMjml(mjml){
	const result = mjml2html(mjml, {
		mjmlConfigPath: appRoot(), // Set mjml config path to script root directory
	})

	// Suppress errors to output
	if (Object.keys(result.errors).length) {
		Object.keys(result.errors).forEach(key => {
			delete result.errors[key].formattedMessage
		})
	}

	return result
}

// Processing HTTP request
const processPost = (request, reply) => {
	if (!request?.body?.mjml) {
		reply.send({
			error: "No MJML input"
		})

		logger.error("Received empty request body")

		return;
	}

	reply.send(parseMjml(request.body.mjml))
}

// Parse Handlebars and then MJML 
const processPostWithHandlebars = (request, reply) => {
	if (!request?.body?.mjml) {
		reply.send({
			error: "No MJML input"
		})

		logger.error("Received empty request body")
		return;
	}

	const template = Handlebars.compile(request.body.mjml)
	
	reply.send(parseMjml(template(request?.body?.values)))
}

// Start Fastify server
const fastify = Fastify({
	logger: {
		base: { pid: undefined, hostname: undefined, label: "http" },
	},
	bodyLimit: 10 * 1024 * 1024, // 10MB
})

// Two URL's
fastify.post('/', processPost)
fastify.post('/v2/parse', processPostWithHandlebars)

// Run the server!
fastify.listen(
	process.env.APP_PORT || 3000,
	process.env.APP_HOST_LISTEN || "0.0.0.0", // Use "127.0.0.1" to accept connections from local interface only
).catch(err => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})

// Handle Ctrl+C (SIGINT)
process.on('SIGINT', () => {
	process.exit(0)
});

// Handle Docker Stop (SIGTERM)
process.on('SIGTERM', () => {
	process.exit(0)
});
