# Simple MJML Server

## Installation

* Install dependencies
    * ```npm install```
* Run the server
    * ``node index.js``
* Configure a reverse proxy to 127.0.0.1:3000

## How to use the server?

### MJML version 3
```bash
curl -X POST "http://127.0.0.1:3000/v3" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-container><mj-section><mj-column><mj-text>Hello World</mj-text></mj-column></mj-section></mj-container></mj-body></mjml>"}'
```

### MJML version 4
```bash
curl -X POST "http://127.0.0.1:3000/v4" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-container><mj-section><mj-column><mj-text>Hello World</mj-text></mj-column></mj-section></mj-container></mj-body></mjml>"}'
```
