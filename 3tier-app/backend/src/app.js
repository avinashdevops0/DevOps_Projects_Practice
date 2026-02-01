require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require("./routes/user.routes"));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
