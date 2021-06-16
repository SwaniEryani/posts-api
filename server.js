require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

const pingRouters = require("./routes/ping");
const postsRouters = require("./routes/posts");

app.use(bodyParser.json());

app.use("/api/ping", pingRouters);
app.use("/api/posts",postsRouters);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;