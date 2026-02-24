# Simple MJML Server

## For developers

* Install dependencies
    * ```npm install```
* Run the server
    * ``node index.js``
* Configure a reverse proxy to 127.0.0.1:3000

# Development run (Docker)
* Start the docker `docker compose up | grep -v "incoming request\|request completed"`. `grep` is here to filter http request log entries 

# Production deployment (Docker)
* Build an image: `docker build --target production -t ipaengasystems/mjml-server:<version_tag> .`
* To test the image locally, update the tag in `docker-compose.prod.yml` and run : `docker compose -f docker-compose.prod.yml up --remove-orphans --force-recreate`
* Push to the repository `docker push ipaengasystems/mjml-server:<version_tag>`

### Using MJML version 4
```bash
curl -X POST "http://127.0.0.1:3000" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-section><mj-column><mj-text>Hello World!</mj-text></mj-column></mj-section></mj-body></mjml>"}'
```

### Using MJML with Handlebars parser
```bash
curl -X POST "http://127.0.0.1:3000/v2/parse" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-section><mj-column><mj-text>{{title}}</mj-text></mj-column></mj-section></mj-body></mjml>","values": {"title": "Hello World!"}}'
```

