const express = require( "express")
require ("./db/tinder_app_db.js")
const productPostRouter =require( './routers/item.js')
const shopRouter =require( './routers/shop.js')
const buyerRouter =require( './routers/buyer.js')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

// automatically parse incoming JSON into JS object which you can access on req.body
app.use(express.json());
app.use(productPostRouter)
app.use(shopRouter)
app.use(buyerRouter)

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

module.exports = app;
