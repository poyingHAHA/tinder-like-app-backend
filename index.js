const express = require("express")

require('./db/mongoose')

const app = express();
const port = process.env.PORT || 3000;

// automatically parse incoming JSON into JS object which you can access on req.body
app.use(express.json());

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
