/**
 * @description Implementation the of middleware pattern (chain of responsibility)
 *
 * @param {Object} ctx
 * @param  {Array} middlewares
 */

const exec = (ctx, ...middlewares) => {
  const run = (index) => {
    if (!!middlewares && index < middlewares.length) {
      middlewares[index](ctx, () => run(index + 1));
    }
  };
  run(0);
};

/**
 * @description Each middleware receives as parameters an object and a callback function for the next middleware
 *
 * @param {Object} ctx
 * @param {Function} next
 *
 */

const middleware1 = (ctx, next) => {
  ctx.info1 = 'middleware1';
  next();
};

const middleware2 = (ctx, next) => {
  ctx.info2 = 'middleware2';
  next();
};

const middleware3 = (ctx, next) => {
  ctx.info3 = 'middleware3';
  next();
};

const middleware4 = (ctx) => (ctx.info4 = 'middleware4');

const ctx = {};
exec(ctx, middleware1, middleware2, middleware3, middleware4);

console.log(ctx);
