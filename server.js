const express = require("express");
const cors = require("cors");
require("dotenv").config();



const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));

app.get("/", (req, res) => {
  res.send("Campus Issue Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(cors({
  origin: "*"
}));
