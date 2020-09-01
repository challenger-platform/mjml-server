const fastify = require('fastify')()
const mjml2html = require('mjml')
const dayjs = require('dayjs')

const port = 3000

const log = {
  error: function (text) {
    console.log("[" + dayjs().format('YYYY-MM-DD HH:mm:ss') + "] Error: " + text)
  },

  notice: function (text) {
    console.log("[" + dayjs().format('YYYY-MM-DD HH:mm:ss') + "] Notice: " + text)
  }
}

// Processing HTTP request
let processPost = function (request, reply) {
  let url = new URL(request.raw.url, 'http://127.0.0.1:' + port)

  if (!request.body || typeof request.body.mjml === 'undefined' || request.body.mjml === null) {
    reply.send({
      error: "No MJML input"
    })

    log.error("Received empty request body")

    return;
  }

  let result = mjml2html(request.body.mjml, {
    minify: true,
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
fastify.listen(port, '127.0.0.1', function (err) {
  if (err) throw err;

  log.notice(`server listening on ${fastify.server.address().port}`)
})
