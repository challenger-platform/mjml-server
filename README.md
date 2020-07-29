# Simple MJML Server

## Installation

* Install dependencies
    * ```npm install```
* Run the server
    * ``node index.js``
* The service is running on to 127.0.0.1:3000

## Production
It is recommended to use supervisor to keep this process running. Example configuration is below.

```
[program:mjml-server]
process_name=%(program_name)s_%(process_num)02d
command=node /var/www/mjml-server/index.js
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/mjml-server/logs/mjml-server.log
```

Don't forget to add `logs` directory (or disable it) in this case.

## How to use the server?

```bash
curl -X POST "http://127.0.0.1:3000" --header "Content-Type: application/json" -d '{"mjml":"<mjml><mj-body><mj-container><mj-section><mj-column><mj-text>Hello World</mj-text></mj-column></mj-section></mj-container></mj-body></mjml>"}'
```
