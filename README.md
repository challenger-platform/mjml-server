# Simple MJML Server

## For developers

* Install dependencies
    * ```npm install```
* Run the server
    * ``node index.js``
* Configure a reverse proxy to 127.0.0.1:3000

## How to use the server?

A Docker can be used for the purpose:
```
sudo docker compose pull
docker compose up -d
```

### Using MJML version 4
```bash
curl -X POST "http://127.0.0.1:3000" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-section><mj-column><mj-text>Hello World!</mj-text></mj-column></mj-section></mj-body></mjml>"}'
```

### Using MJML with Handlebars parser
```bash
curl -X POST "http://127.0.0.1:3000/v2/parse" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-section><mj-column><mj-text>{{title}}</mj-text></mj-column></mj-section></mj-body></mjml>","values": {"title": "Hello World!"}}'
```

