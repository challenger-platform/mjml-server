const fastify = require('fastify')()
const mjml = require('mjml')
const dayjs = require('dayjs')

const log = {
  error: function (text) {
    console.log("[" + dayjs().format('YYYY-MM-DD HH:mm:ss') + "] Error: " + text)
  },

  notice: function (text) {
    console.log("[" + dayjs().format('YYYY-MM-DD HH:mm:ss') + "] Notice: " + text)
  }
}

fastify.post('/', function (request, reply) {
  if (!request.body || typeof request.body.mjml === 'undefined' || request.body.mjml === null) {
    reply.send({
      error: "No MJML input"
    })

    log.error("Received empty request body")

    return;
  }

  let result = mjml.mjml2html(request.body.mjml);

  if (Object.keys(result.errors).length) {
    Object.keys(result.errors).forEach((key) => {
      delete result.errors[key].formattedMessage
    })
  }

  reply.send(result)
})

// Run the server!
fastify.listen(3000, '127.0.0.1', function (err) {
  if (err) throw err;

  log.notice(`server listening on ${fastify.server.address().port}`)
})
