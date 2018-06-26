# Unchained UI

## Events

[![NPM Version](https://img.shields.io/npm/v/uc-events.svg?style=flat-square)](https://www.npmjs.com/package/uc-events)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-events.svg?style=flat-square)](https://www.npmjs.com/package/uc-events)

Simple events bus mixin

### Usage

```js
import events from 'uc-events'

const MyClass = function() {
  this.events = {};
  this.on('event', this.method, this);
  this.emit('event');
}

MyClass.prototype = Object.assign({},
  events,
  {
    method: function() {
      console.log('Event fired');
    }
  }
)

```

### Methods

#### on(event, handler[, context])

Adds the event `handler` to the `event`. You can use `context` to set `this` context for the handler. Returns the class instance so you can chain the calls.

#### once(event, handler[, context])

Same as the above but fires only once.

#### off(event, handler[, context])

Removes the event `handler` to the `event`. You should pass the `context` if you subscribed to the event with context. Returns the class instance so you can chain the calls.

#### emit(event, ...args)

Emits the event

### Properties

* **events** - object, this is the events handlers storage

License MIT

© velocityzen

