const app = require("./routes/index");
const port = 3000;
const { connectTodB, getCollection } = require("./services/db/connection");
const { findOne } = require("./services/db/crud");

startServer();

function startServer() {
  connectTodB();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
