import express from "express"
import "./db/tinder_app_db.js"
import productPostRouter from './routers/item.js'
import shopRouter from './routers/shop.js'
import buyerRouter from './routers/buyer.js'

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


