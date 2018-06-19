import { LOG_LEVEL } from 'uc-log'

function indexOfHandler(handlers, h) {
  let i = handlers.length;

  while (i--) {
    const hh = handlers[i];
    if (hh.h === h.h) {
      if ((hh.c && hh.c === h.c) || (h.c && h.c === hh.c) || (!hh.c && !h.c)) {
        return i;
      }
    }
  }

  return -1;
}

export default {
  on: function(event, handler, context) {
    const h = {
      h: handler
    }

    if (context) {
      h.c = context;
    }

    let handlers = this.events[event];
    if (!handlers) {
      handlers = this.events[event] = [];
    }

    if (indexOfHandler(handlers, h) === -1) {
      handlers.push(h);
    }

    this.log && this.log(LOG_LEVEL.INFO, h.once ? 'once' : 'on', event);
    return this;
  },

  off: function(event, handler, context) {
    this.log && this.log(LOG_LEVEL.INFO, 'off', event);

    const handlers = this.events[event];
    if (!handlers) {
      return this;
    }

    const h = {
      h: handler
    }

    if (context) {
      h.c = context;
    }

    const index = indexOfHandler(handlers, h);
    if (index !== -1) {
      handlers.splice(index, 1);
    }

    if (handlers.length === 0) {
      delete this.events[event];
    }

    return this;
  },

  once: function(event, handler, context) {
    const once = (...args) => {
      this.off(event, once);
      handler.apply(context, args);
    }

    this.on(event, once);
    return this;
  },

  emit: function(event, ...args) {
    this.log && this.log(LOG_LEVEL.INFO, 'emit', event, ...args);
    const handlers = this.events[event];
    if (!handlers || !handlers.length) {
      return this;
    }

    handlers.slice().forEach(ctx => {
      ctx.h.apply(ctx.c, args);
    });
    return this;
  }
};
