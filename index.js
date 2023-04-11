const fastify = require('fastify')()
const mjml2html = require('mjml')
const dayjs = require('dayjs')

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

// Processing HTTP request
let processPost = (request, reply) => {
	// let url = new URL(request.raw.url, 'http://127.0.0.1:' + port)

	if (!request.body || typeof request.body.mjml === 'undefined' || request.body.mjml === null) {
		reply.send({
			error: "No MJML input"
		})

		log.error("Received empty request body")

		return;
	}

	let result = mjml2html(request.body.mjml, {
		mjmlConfigPath: __dirname, // Set mjml config path to script root directory
	})

	if (Object.keys(result.errors).length) {
		Object.keys(result.errors).forEach((key) => {
			delete result.errors[key].formattedMessage
		})
	}

	reply.send(result)
}

// Two URL's
fastify.post('/', processPost)

// Run the server!
fastify.listen(port, host, (err) => {
	if (err) throw err;

	log.notice(`server listening on ${fastify.server.address().port}`)
})
