const fastify = require('fastify')()
const mjml2html = require('mjml')
const dayjs = require('dayjs')
const { compile } = require('handlebars')

const port = 3000
const host = "0.0.0.0" // Use "127.0.0.1" to accept connections from local interface only

const log = {
	error (text) {
		console.log("[" + dayjs().format('YYYY-MM-DD HH:mm:ss') + "] Error: " + text)
	},

	notice (text) {
		console.log("[" + dayjs().format('YYYY-MM-DD HH:mm:ss') + "] Notice: " + text)
	}
}

// Parse MJML and return result
function parseMjml(mjml){
	let result = mjml2html(mjml, {
		mjmlConfigPath: __dirname, // Set mjml config path to script root directory
	})

	// Suppress errors to output
	if (Object.keys(result.errors).length) {
		Object.keys(result.errors).forEach((key) => {
			delete result.errors[key].formattedMessage
		})
	}

	return result
}

// Processing HTTP request
let processPost = (request, reply) => {
	if (!request?.body?.mjml) {
		reply.send({
			error: "No MJML input"
		})

		log.error("Received empty request body")

		return;
	}

	reply.send(parseMjml(request.body.mjml))
}

// Parse Handlebars and then MJML 
let processPostWithHandlebars = (request, reply) => {
	if (!request?.body?.mjml) {
		reply.send({
			error: "No MJML input"
		})

		log.error("Received empty request body")

		return;
	}

	let template = compile(request.body.mjml)
	
	reply.send(parseMjml(template(request?.body?.values)))
}

// Two URL's
fastify.post('/', processPost)
fastify.post('/v2/parse', processPostWithHandlebars)

// Run the server!
fastify.listen(port, host, (err) => {
	if (err) throw err;

	log.notice(`server listening on ${fastify.server.address().port}`)
})
