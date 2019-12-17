# NodeJS Request Logger
This module creates a middleware for request logging. 
This logs request url, status and response time to mysql database using sequelize on response finish event without affecting api performance.
Additional properties `user_id: req.user.id`

## Prerequisites
Thins middleware need time taken by request to complete.
- [Response Time](https://www.npmjs.com/package/response-time) npm install --save response-time

MYSQL Table Schema (table name is configurable)

```sql
CREATE TABLE IF NOT EXISTS `access_logs` (
  `id` int(11) NOT NULL,
  `response_time` decimal(15,4) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `request` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `user_id` int(14) DEFAULT NULL,
  `app_id` tinyint(3) unsigned DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `access_logs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `access_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install express-request-logging
```

## API
```js
const requestLogger = require('express-request-logging')
```

### requestLogger(db, config, callback)

Create a middleware that logs request url, status and response time on response finish event.

### db
Its sequelize database instance in which `access_logs` table is present.

### config
You can override default table name and pass application id.

```
 {
    appId: number, // this is used if multiple application storing request logs in same database (default: null)
    tableName: string, // mysql table name (default: 'access_logs')
 }
```

### callback

Callback will be called in case of any error

## Example

### Default

```js
const responseTime = require('response-time')
const requestLogger = require('express-request-logging')

app.use(responseTime())
app.use(requestLogger(sequelizeInstance)
```

### Custom

```js
const responseTime = require('response-time')
const requestLogger = require('express-request-logging')

app.use(responseTime())
app.use(requestLogger(sequelizeInstance, { appId: 1 }, (err) => console.log(err))

```

## License

[MIT](LICENSE)

