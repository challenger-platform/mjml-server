const fastify = require('fastify')()
const mjml3 = require('mjml3')
const mjml4 = require('mjml4')
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

  // Parse MJML4
  if(url.pathname == '/v4'){
    let result = mjml4(request.body.mjml, {
      minify: true,
    });

    console.log(result);
    reply.send(result.html)
  }else{ // Parse MJML3 by default
    let result = mjml3.mjml2html(request.body.mjml);

    if (Object.keys(result.errors).length) {
      Object.keys(result.errors).forEach((key) => {
        delete result.errors[key].formattedMessage
      })
    }

    reply.send(result)
  }
}

// Two URL's
fastify.post('/', processPost)
fastify.post('/v3', processPost)
fastify.post('/v4', processPost)

// Run the server!
fastify.listen(port, '127.0.0.1', function (err) {
  if (err) throw err;

  log.notice(`server listening on ${fastify.server.address().port}`)
})
