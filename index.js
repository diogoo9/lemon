const express = require("express");
const Routes = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(3000, () => {
  console.log("aplication started");
});
