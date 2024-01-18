const ordersRouter = require('../app/orders/router')
const customOrdersRouter = require('../app/custom_orders/router')

const loginRouter = require('../app/login/router') 
const publicRouter = require('../app/public/router') 

const adminAuthMiddleware = require('../middlewares/admin') 
const adminRouter = require('../app/admin/router')

module.exports.init = (app) => {
  app.use("/api/public",publicRouter)
  app.use("/api/orders", ordersRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/cust-orders", customOrdersRouter);

  // protected routers
  app.use("/api/*", adminAuthMiddleware);
  app.use("/api/admin", adminRouter);
  

};