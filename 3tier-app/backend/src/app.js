require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require("./routes/user.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});
