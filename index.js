const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
const port = 3000;

// express app initialization
const app = express();
app.use(express.json());

// Database connectivity with mongoose
mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));
// Database connectivity with mongoose done

// Application routes
app.use("/todo", todoHandler);

// Default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port, () => {
  console.log(`Mongoose CRUD app listening on port ${port}`);
});
