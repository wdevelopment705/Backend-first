const express = require("express");
const cors = require("cors");

const app = express();        
app.use(express.json(),cors());

app.use("/", require("./routes/routes"));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
