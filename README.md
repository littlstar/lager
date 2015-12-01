# Lager
Lager enables you to collect data, organize it, and programmatically flush it to a single endpoint.  Logs are separated by type, each of which contains an array of entries.  Logs can then be flushed by type or all at once.

Logs are sent as a POST request in the form
```javascript
{
  payload: {
    'type': [log[, log]],
    'type_2': [log[, log]]
    ...
  }
}
```
where ```log``` is an object of key-value pairs.

## Install
**Node**
```
npm install lagerjs --save
```
**Browser**
Include ```build/lager.js``` or ```build/lager.min.js``` in your HTML file.  Alternatively, you can build lager yourself with ```make```.

##Usage
**Lager.log(type, data[, flush])**  
Store log ```data``` and associate it with an ```type```.  Optionally set ```flush``` to true to send the data immediately.  Flush is false by default.

**Lager.flush([type])**  
Send all logs to the endpoint.  Optionally give ```type```, and only those logs will be sent.

## Example
```javascript
var Lager = require('lagerjs');

var logger = new Lager({
  host: 'yourserver.io/some-endpoint' // or whatever
});

logger.log('playstart', { name: 'wells' });
logger.log('playstart', { paused: true });
logger.log('playstart', { hd: false });
logger.log('playend', { seconds: 50 });
```

Will produce the following data in memory
```javascript
{
  payload: {
    'playstart': [{ name: 'wells' }, {paused: true}, {hd: false}],
    'playend': [{ seconds: 50 }]
  }
}
```
Then send logs to a backend
```javascript
logger.flush('playstart') // flush playstart logs only
logger.flush()            // alternatively flush everything

```

## License
MIT
