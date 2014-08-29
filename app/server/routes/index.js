var path = require('path');
var Resource = require('koa-resource-router');
var controllers = require(path.resolve(__dirname, '..', 'controllers'));

module.exports = function(app) {
  app.get('/', controllers.index);

  // /products[/:product]
  var products = new Resource('products', controllers.products);

  // /products/:product/plans[/:plan]
  var plans = new Resource('plans', controllers.plans);

  // /products/:product/customers[/:customer]
  var customers = new Resource('customers', controllers.customers);

  products.add(plans);
  products.add(customers);

  app.use(products.middleware());
  app.use(plans.middleware());
  app.use(customers.middleware());
};